import { Conversation, User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import { redirect } from "next/navigation";
import { ConversationList } from "./ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();

  if (!signedIn) {
    redirect(auth.getBuiltinUIUrl());
  }
  const conversations = (await session.client.query(`
  Select Conversation {
    *,
    participants: {
      id, name, githubUsername
    },
    participant := (SELECT assert_single((SELECT .participants filter .id != global current_user.id))){id, name, githubUsername}
  }
  filter global current_user in .participants
  order by .updated desc
`)) as (Conversation & { participant: User })[];

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Conversations
        </h1>
      </header>
      <div className="flex gap-4">
        <ConversationList conversations={conversations} />
        <div>{children}</div>
      </div>
    </div>
  );
}
