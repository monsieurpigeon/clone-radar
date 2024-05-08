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
  WITH currentUser := (SELECT global current_user),
  clones := (
      (FOR channel in currentUser.channels
      UNION channel.<channels[is User]) UNION
      (FOR boardGame in currentUser.boardGames
      UNION boardGame.<boardGames[is User]) UNION
      (FOR author in currentUser.authors
      UNION author.<authors[is User])
    ),
    cloneResult := (GROUP clones BY .email),
    myClones := (SELECT cloneResult {
      element := (SELECT .elements LIMIT 1){
        email,
      },
      cloneCount := count(.elements)
    } FILTER .element.email != currentUser.email
    ORDER BY .cloneCount DESC
    LIMIT 10)

    UPDATE User
        FILTER .email = currentUser.email
    SET {
      clones := (FOR clone in myClones UNION (INSERT Clone {
        element := clone.element,
        cloneCount := clone.cloneCount
      }))
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
      myConversations := (SELECT Conversation {id} FILTER global current_user in .participants), 
      previous := (SELECT myConversations FILTER other in .participants),
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
