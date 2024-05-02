import { auth } from "@/edgedb-client";
import { revalidatePath } from "next/cache";
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

export async function scanMatches() {
  "use server";

  const { client } = auth.getSession();

  const [{ id: distinctId }]: { id: string }[] = await client.query(`
    with myMatches := (SELECT User {
        email,
        channels: {
          name
        },
        matchCount := (Select count(User.channels.name intersect global current_user.channels.name))
    } filter .matchCount > 0 and .email != global current_user.email)
    update User
        filter .email = global current_user.email
    set {
      matches := myMatches
    }
  `);
  posthog.capture({
    distinctId,
    event: "scanned_matches",
  });

  revalidatePath("/matches");
}
