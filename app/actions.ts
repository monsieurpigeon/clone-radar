"use server";

import {
  Channel,
  Clone,
  Conversation,
  Message,
  User,
} from "@/dbschema/interfaces";
import { auth } from "@/edgedb-client";
import { MAX_MESSAGE_SIZE, SCAN_LIMIT } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { PostHog } from "posthog-node";
import { ChannelInputProps } from "./(inside)/collection";

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
      *,
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

export async function getRecentClones(): Promise<Clone[] | null> {
  const session = auth.getSession();
  return session.client.query(
    `SELECT Clone {
        matchCount,
        users: {githubUsername, name} ORDER BY .name,
    } FILTER .created > <datetime>'${new Date().toISOString()}' - <cal::relative_duration>'30 days'
    ORDER BY .matchCount DESC
    LIMIT 10`
  );
}

export async function addChannels(channels: ChannelInputProps[]) {
  const session = auth.getSession();
  return session.client.query(
    `
  WITH raw_data := <array<str>>$ids,
  UPDATE User FILTER global current_user.id = .id
  set {
    channels += (SELECT Channel FILTER .youtubeId IN array_unpack(raw_data))
  }
  `,
    { ids: channels.map((c) => c.youtubeId) }
  );
}

export async function addChannel(channel: ChannelInputProps) {
  const session = auth.getSession();

  const check: number[] = await session.client.query(
    `SELECT count((SELECT global current_user.channels))`
  );

  if (check[0] >= 16) {
    return "You can only add 16 channels. Please remove one to add one.";
  }

  const res = await session.client.query(
    `
      with newChannel := (
        insert Channel {
          name := <str>$name,
          youtubeId := <str>$youtubeId,
          description := <str>$description,
          thumbnailUrl := <str>$thumbnailUrl,
          subscriberCount := <int64>$subscriberCount,
          videoCount := <int64>$videoCount
        }
        unless conflict on .youtubeId
        else (
          update Channel set {
            name := <str>$name,
            description := <str>$description,
            thumbnailUrl := <str>$thumbnailUrl,
            subscriberCount := <int64>$subscriberCount,
            videoCount := <int64>$videoCount
          }
        )
      )
      update User FILTER global current_user.id = .id
      set {
        channels += newChannel
      }
      `,
    {
      youtubeId: channel.youtubeId,
      name: channel.name,
      description: channel.description,
      thumbnailUrl: channel.thumbnailUrl,
      subscriberCount: channel.subscriberCount,
      videoCount: channel.videoCount,
    }
  );

  if (res.length === 0) {
    return "Cannot add item";
  }

  return null;
}

export async function deleteChannel(id: string) {
  const session = auth.getSession();

  const res = await session.client.query(
    `WITH deletedChannel := (
      SELECT Channel FILTER .id = <uuid>$id LIMIT 1
    )
    UPDATE User FILTER .id = global current_user.id
    SET {
      channels := .channels except deletedChannel
    }`,
    { id }
  );

  if (res.length === 0) {
    return "Cannot delete item";
  }

  return null;
}

export async function getMe(): Promise<User | null> {
  const session = auth.getSession();

  return session.client.querySingle(
    `SELECT global current_user {
      *,
      channels: {
        *
      } ORDER BY .subscriberCount DESC
    };`
  );
}

export async function getMyClones(): Promise<Clone[] | null> {
  const session = auth.getSession();
  return session.client.query(
    `SELECT Clone {
      id,
      matchCount,
      users: {id, name, githubUsername},
      restrictedItems: {name, id, youtubeId} ORDER BY .subscriberCount DESC,
      other: {id, name, githubUsername},
      conversation: {id}
    }
    FILTER global current_user in .users
    ORDER BY .matchCount DESC THEN .created DESC
    LIMIT 100
`
  );
}

export async function scanMatches() {
  const session = auth.getSession();
  await session.client.query(
    `WITH currentUser := (SELECT global current_user),
    myPreviousClones := (SELECT Clone FILTER currentUser in .users),
    FOR myClone in myPreviousClones UNION ((
      UPDATE Clone FILTER .id = myClone.id SET {
        matchCount := (SELECT count((SELECT myClone.other.channels intersect currentUser.channels))),
        restrictedItems := (SELECT myClone.other.channels intersect currentUser.channels)
      }
    ));
    
    DELETE Clone FILTER global current_user in .users AND .matchCount < max(.users.threshold);`
  );

  const query = session.client.query(
    `WITH currentUser := (SELECT global current_user),
  pool := (SELECT (SELECT currentUser.channels.fans) FILTER .id != currentUser.id),
  myPreviousClones := (SELECT (SELECT Clone FILTER currentUser in .users).other),
  myClones := (SELECT {myPreviousClones, pool} {
    id,
    channels,
    matchCount := (SELECT count((SELECT .channels intersect currentUser.channels))),
  } FILTER .matchCount >= max({.threshold, currentUser.threshold}) ORDER BY .matchCount DESC LIMIT 10)
  FOR myClone in myClones UNION ((
    INSERT Clone {
      users := (SELECT User FILTER .id in {currentUser.id, myClone.id}),
      cloneId := (SELECT array_join(array_agg((SELECT test:={<str>myClone.id, <str>currentUser.id} ORDER BY test)), ":")),
      matchCount := myClone.matchCount,
      restrictedItems := (SELECT myClone.channels intersect currentUser.channels),
    } unless conflict on .cloneId else (
      (DELETE Clone) if {myClone.matchCount = 0} else
      (UPDATE Clone SET {
        matchCount := myClone.matchCount,
        restrictedItems := (SELECT myClone.channels intersect currentUser.channels)
      })
    )));
  `
  );

  const updateUser = session.client.query(
    `UPDATE User FILTER global current_user.id = .id
    SET {
      lastScans := [datetime_of_statement()] ++ .lastScans[0:${SCAN_LIMIT - 1}]  
    }`
  );

  const dramaticWait = sleep(5000);

  await Promise.all([dramaticWait, query, updateUser]);

  revalidatePath("/radar");
}

export async function createConversation(id: string): Promise<string> {
  const session = auth.getSession();
  const res: { conversation: { id: string } | null } | null =
    await session.client.querySingle(
      `SELECT Clone {conversation} FILTER .id = <uuid>$id`,
      { id }
    );
  if (res?.conversation) {
    return res.conversation.id;
  } else {
    const updatedClone: { conversation: { id: string } | null } | null =
      await session.client.querySingle(
        `UPDATE Clone FILTER .id = <uuid>$id SET {
        conversation := (INSERT Conversation)
      };
      SELECT Clone {conversation} FILTER .id = <uuid>$id`,
        { id }
      );
    return updatedClone?.conversation?.id || "";
  }
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
  revalidatePath("/messages");
  return previous[0].id;
}

export async function getConversations(): Promise<
  (Conversation & { participant: User })[]
> {
  const session = auth.getSession();
  return session.client.query(
    `SELECT Conversation {
      *,
      origin: {users: {id, name, githubUsername}} ,
      participant := (SELECT assert_single((SELECT .origin.users filter .id != global current_user.id))){
        id, name, githubUsername
      }
    }
    FILTER global current_user in .origin.users
    ORDER BY .updated DESC
`
  );
}

export async function getConversationById(
  id: string
): Promise<
  (Conversation & { participant: User; lastMessages: Message[] }) | null
> {
  const session = auth.getSession();
  return session.client.querySingle(
    `SELECT Conversation {
      *,
      origin: {
        restrictedItems: {name, id, youtubeId} ORDER BY .subscriberCount DESC
      },
      participant := (SELECT assert_single((SELECT .origin.users filter .id != global current_user.id))){
        id, name, githubUsername
      },
      lastMessages := (SELECT .messages ORDER BY .created DESC LIMIT 10){ *, author: {*} }
    }
    FILTER .id = <uuid>$id`,
    { id }
  );
}

export async function updateThreshold(threshold: number) {
  const session = auth.getSession();
  await session.client.query(
    `UPDATE User FILTER global current_user.id = .id
    SET {
      threshold := <int64>$threshold
    }`,
    { threshold }
  );
  revalidatePath("/radar");
}

export async function getUnreadConversations(): Promise<
  { id: string }[] | null
> {
  const session = auth.getSession();
  return session.client.query(`SELECT global current_user.unreadConversations`);
}

export async function sendMessage(formData: FormData) {
  const { client } = auth.getSession();
  const message = formData.get("message")?.toString();
  if (!message) return;
  const conversationId = formData.get("conversationId");
  const trimmedMessage = message.substring(0, MAX_MESSAGE_SIZE);
  await client.query(
    `
        UPDATE Conversation
        FILTER .id = <uuid>$conversationId
        SET {
            unread := assert_single(.origin.other),
            messages += (INSERT Message {
                text := <str>$message,
                author := global current_user
            }),
            lastWritten := datetime_of_statement()
        }
      `,
    { conversationId, message: trimmedMessage }
  );
}

export async function setConversationRead(id: string) {
  const session = auth.getSession();
  await session.client.query(
    `UPDATE Conversation FILTER .id = <uuid>$id SET {
      unread := {}
    }`,
    { id }
  );
}

export async function checkConversationUnread(id: string) {
  const session = auth.getSession();
  return session.client.querySingle(
    `WITH conversation := (SELECT Conversation FILTER .id = <uuid>$id)
    SELECT conversation.unread = global current_user`,
    { id }
  );
}

export async function getUnreadMessages(
  conversationId: string
): Promise<{ lastMessages: Message[] } | null> {
  const session = auth.getSession();
  return session.client.querySingle(
    `SELECT Conversation {
      lastMessages := (SELECT .messages ORDER BY .created DESC LIMIT 10){ *, author: {name} }
    } FILTER .id = <uuid>$conversationId`,
    { conversationId }
  );
}
