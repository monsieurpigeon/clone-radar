import { auth } from "@/edgedb-client";
import Link from "next/link";

export default async function ConversationsPage() {
  const { client } = auth.getSession();
  const conversations = await client.query(`
  Select Conversation {
    *,
    participants: {
      email
    },
    participant := (SELECT assert_single((SELECT .participants filter .email = global current_user.email))){email}
  }
  filter global current_user in .participants
`);

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Conversations
        </h1>
      </header>
      <div>
        {conversations.map((conversation) => {
          return (
            <div key={conversation.id}>
              <Link href={`/conversations/${conversation.id}`}>
                <div>{conversation.participant.email}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
