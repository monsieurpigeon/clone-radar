"use server";

import { auth } from "@/edgedb-client";
import { revalidatePath } from "next/cache";
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

export async function scanMatches() {
  const { client } = auth.getSession();

  const result = await client.query(`
  WITH currentUser := (SELECT global current_user),
  pool := (SELECT (SELECT currentUser.channels.fans) FILTER .id != currentUser.id),
  myClones := (SELECT pool {
    id,
    channels,
    matchCount := (SELECT count((SELECT .channels intersect currentUser.channels)))
  } ORDER BY .matchCount LIMIT 5)

  FOR clone in myClones UNION (INSERT Clone {
    matchCount := clone.matchCount,
    scanner := currentUser,
    scanned := clone
  } unless conflict on (.scanner, .scanned) else (
     UPDATE Clone SET { matchCount := clone.matchCount }
  ))
  `);
  // posthog.capture({
  //   distinctId,
  //   event: "scanned_matches",
  // });

  revalidatePath("/matches");
}

export async function createConversation(formData: FormData) {
  const { client } = auth.getSession();
  const otherId = formData.get("otherId");
  console.log({ otherId });
  const id = await client.query(
    `
      with other := (SELECT User {}
      FILTER .id = <uuid>$otherId),
      myConversations := (SELECT Conversation {id} FILTER global current_user in .participants), 
      previous := (SELECT myConversations FILTER other in .participants),
      SELECT(INSERT Conversation {
        participants := {global current_user, other}
      }){id} if len(array_agg(previous)) = 0
      else previous
    `,
    { otherId }
  );
  revalidatePath("/conversations");
  return id;
}
