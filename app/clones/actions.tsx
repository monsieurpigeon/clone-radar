"use server";

import { auth } from "@/edgedb-client";
import { revalidatePath } from "next/cache";
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

export async function scanMatches() {
  const { client } = auth.getSession();

  await client.query(`
  WITH currentUser := (SELECT global current_user),
  pool := (SELECT (SELECT currentUser.channels.fans) FILTER .id != currentUser.id),
  myClones := (SELECT pool {
    id,
    channels,
    matchCount := (SELECT count((SELECT .channels intersect currentUser.channels))),
  } ORDER BY .matchCount LIMIT 5)

  FOR clone in myClones UNION ((
    INSERT Clone {
      users :=  (SELECT User FILTER .id in {currentUser.id, clone.id}),
       cloneId := (SELECT array_join(array_agg((SELECT test:={<str>clone.id, <str>currentUser.id} ORDER BY test)), ":")),
      matchCount := clone.matchCount,
    } unless conflict on .cloneId else (
       UPDATE Clone SET { matchCount := clone.matchCount }
    )))   
  `);
  // posthog.capture({
  //   distinctId,
  //   event: "scanned_matches",
  // });

  revalidatePath("/clones");
}

export async function createConversation(formData: FormData) {
  const { client } = auth.getSession();
  const otherId = formData.get("otherId");
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
