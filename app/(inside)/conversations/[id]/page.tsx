import { Conversation, Message, User } from "@/dbschema/interfaces";
import { auth } from "@/edgedb-client";
import { durationFormatter } from "@/utils/formatter";
import { ChatForm } from "./ChatForm";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { client } = auth.getSession();
  const conversation:
    | (Conversation & { participant: User; lastMessages: Message[] })
    | null = await client.querySingle(
    `Select Conversation { *,
        participant := (SELECT assert_single((SELECT .participants filter .id != global current_user.id))){id, name, githubUsername},
        messages: { *, author: {*} },
        lastMessages := (SELECT .messages ORDER BY .created DESC LIMIT 5){ *, author: {*} }
    }
    filter .id = <uuid>$id`,
    { id: params.id }
  );

  if (!conversation) {
    return <div>Conversation not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col-reverse gap-4">
          {conversation.lastMessages?.map((message) => {
            return (
              <div key={message.id} className="p-2 border rounded">
                <div className="flex gap-4 text-sm">
                  <div className="font-semibold">{message.author.name}</div>
                  <div>{durationFormatter(message.created)}</div>
                </div>

                <div>{message.text}</div>
              </div>
            );
          })}
        </div>
        <div>
          <ChatForm conversationId={params.id} />
        </div>
      </div>
    </div>
  );
}
