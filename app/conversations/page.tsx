import { auth } from "@/edgedb-client";
import Link from "next/link";
import { Conversation, User } from "../../dbschema/interfaces";
import { durationFormatter } from "../../utils/formatter";

export default async function ConversationsPage() {
  const { client } = auth.getSession();
  const conversations = (await client.query(`
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
      <div className="flex flex-col gap-4">
        {conversations.map((conversation) => {
          return (
            <div key={conversation.id} className="border rounded p-4">
              <Link href={`/conversations/${conversation.id}`}>
                <div>
                  <p className="font-semibold">
                    {conversation.participant.name}
                  </p>
                  <p>{durationFormatter(conversation.updated)}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
