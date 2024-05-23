import { durationFormatter } from "@/utils/formatter";
import { getConversationById } from "../../../actions";
import { ChatForm } from "./ChatForm";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const conversation = await getConversationById(params.id);

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
