"use server";

import { auth } from "@/edgedb-client";
import { revalidatePath } from "next/cache";
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

export async function scanMatches() {
  const { client } = auth.getSession();

  const [{ id: distinctId }]: { id: string }[] = await client.query(`
    with myMatches := (SELECT User {
        email,
        channels: {
          id
        },
        boardGames: {
          id
        },
        authors: {
          id
        },
        matchCount := (SELECT count(User.channels.id INTERSECT global current_user.channels.id)
        + count(User.boardGames.id INTERSECT global current_user.boardGames.id)
        + count(User.authors.id INTERSECT global current_user.authors.id))
    } filter .matchCount > 0 AND .email != global current_user.email ORDER BY .matchCount DESC)
    UPDATE User
        FILTER .email = global current_user.email
    SET {
      matches := myMatches
    }
  `);
  posthog.capture({
    distinctId,
    event: "scanned_matches",
  });

  revalidatePath("/matches");
}

export async function createConversation(formData: FormData) {
  const { client } = auth.getSession();
  const email = formData.get("email");
  const id = await client.query(
    `
      with other := (SELECT User {}
      FILTER .email = <str>$email),
       current_users := (SELECT global current_user) union other,
       previous := (SELECT Conversation {id} filter current_users in .participants),
      SELECT(INSERT Conversation {
        participants := {global current_user, other}
      }){id} if len(array_agg(previous)) = 0
      else previous
    `,
    { email }
  );

  revalidatePath("/conversations");
  return id;
}