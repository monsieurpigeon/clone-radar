"use server";

import { Channel, Clone } from "@/dbschema/interfaces";
import { auth } from "@/edgedb-client";
import { revalidatePath } from "next/cache";
import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPopularChannels(): Promise<Channel[] | null> {
  const session = auth.getSession();
  return session.client.query(
    `SELECT Channel {
      youtubeId,
      name,
      cloneRate := count(.fans)
    } ORDER BY .cloneRate DESC EMPTY LAST
    THEN .subscriberCount DESC
    LIMIT 10`
  );
}

export async function getRecentChannels(): Promise<Channel[] | null> {
  const session = auth.getSession();
  return await session.client.query(
    `SELECT Channel {
        youtubeId,
        name
    } ORDER BY .created DESC
    LIMIT 10`
  );
}

export async function getRecentScans(): Promise<Clone[] | null> {
  const session = auth.getSession();
  return await session.client.query(
    `SELECT Clone {
        matchCount,
        users: {githubUsername}
    } FILTER .created > <datetime>'${new Date().toISOString()}' - <cal::relative_duration>'30 days'
    ORDER BY .matchCount DESC
    LIMIT 10`
  );
}

export async function getMyClones(): Promise<Clone[] | null> {
  const session = auth.getSession();
  return session.client.query(
    `SELECT Clone {
      matchCount,
      users: {id, name, githubUsername},
      restrictedItems: {name, id},
      other: {id, name, githubUsername}
    }
    FILTER global current_user in .users
    ORDER BY .matchCount DESC
`
  );
}

export async function scanMatches() {
  const session = auth.getSession();
  const query = session.client.query(`
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

  const dramaticWait = sleep(3000);

  await Promise.all([query, dramaticWait]);

  revalidatePath("/clones");
}

export async function getConversation(otherId: string): Promise<string> {
  const session = auth.getSession();
  const previous = (await session.client.query(
    `
      WITH other := (SELECT User FILTER .id = <uuid>$otherId),
      myConversations := (SELECT Conversation {id} FILTER global current_user in .participants), 
      previous := (SELECT myConversations FILTER other in .participants),
      SELECT(INSERT Conversation {
        participants := {global current_user, other}
      }){id} if len(array_agg(previous)) = 0
      else previous
    `,
    { otherId }
  )) as { id: string }[];
  revalidatePath("/conversations");
  return previous[0].id;
}
