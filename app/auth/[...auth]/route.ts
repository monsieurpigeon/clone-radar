import { Octokit } from "@octokit/core";
import { auth } from "edgedb-client";
import { redirect } from "next/navigation";

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp }) {
    if (error) {
      console.error("sign in failed", error);
    }

    if (!tokenData) {
      console.log("email verification required");
    }
    if (isSignUp) {
      const octokit = new Octokit({ auth: tokenData?.provider_token });
      const result = await octokit.request("GET /user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      const client = auth.getSession().client;

      await client.query(`
        INSERT User {
          name := '${result?.data?.name}',
          email := '${result?.data?.email}',
          avatarUrl := '${result?.data?.avatar_url}',
          githubUsername := '${result?.data?.login}',
          userRole := 'user',
          identity := (global ext::auth::ClientTokenIdentity)
        }
      `);
    }
    redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});
