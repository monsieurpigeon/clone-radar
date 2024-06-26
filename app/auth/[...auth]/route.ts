import { Octokit } from "@octokit/core";
import { auth } from "edgedb-client";
import { redirect } from "next/navigation";
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp, provider }) {
    if (error) {
      console.error("sign in failed", error);
    }

    if (!tokenData) {
      console.log("email verification required");
    }

    if (true) {
      if (provider === "builtin::local_emailpassword") {
        const client = auth.getSession().client;

        const emailData = await client.querySingle<{ email: string }>(`
        SELECT ext::auth::EmailFactor {
          email
        } FILTER .identity = (global ext::auth::ClientTokenIdentity)
      `);

        await client.query(`
        INSERT User {
          name := '',
          email := '${emailData?.email}',
          avatarUrl := 'test',
          githubUsername := 'test',
          userRole := 'user',
          identity := (global ext::auth::ClientTokenIdentity)
        }
      `);
      }
      if (provider === "builtin::oauth_github") {
        const octokit = new Octokit({ auth: tokenData?.provider_token });
        const result = await octokit.request("GET /user", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        const client = auth.getSession().client;

        const resultEdge = await client.query(
          `
        INSERT User {
          name := <optional str>$name,
          email := <optional str>$email,
          avatarUrl := <optional str>$avatarUrl,
          githubUsername := <optional str>$githubUsername,
          userRole := 'user',
          identity := (global ext::auth::ClientTokenIdentity),
          threshold := <int64>1,
          lastScans := <array<datetime>>[],
        } unless conflict on .githubUsername
        else (UPDATE User SET {
          name := <optional str>$name,
          email := <optional str>$email,
          avatarUrl := <optional str>$avatarUrl,
        })
      `,
          {
            name: result?.data?.name || result?.data?.login,
            email: result?.data?.email,
            avatarUrl: result?.data?.avatar_url,
            githubUsername: result?.data?.login,
          }
        );

        posthog.identify({
          distinctId: resultEdge?.[0]?.id,
          properties: {
            name: result?.data?.name || result?.data?.login,
            email: result?.data?.email,
            github: result?.data?.login,
          },
        });
      }
    }
    redirect("/collection");
  },
  onSignout() {
    redirect("/");
  },
});
