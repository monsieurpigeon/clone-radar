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
    <div className="h-full bg-slate-50 border rounded p-4">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col-reverse gap-4 grow">
          {conversation.lastMessages?.map((message) => {
            const isOther = message.author.id === conversation.participant.id;
            return (
              <div
                key={message.id}
                className={`${isOther ? "self-start" : "self-end"}`}
              >
                <div className="p-2 border max-w-80 rounded bg-white">
                  <div>{message.text}</div>
                </div>
                <div
                  className={`flex gap-4 text-sm opacity-50 ${isOther ? "justify-start" : "justify-end"}`}
                >
                  <div className="">{durationFormatter(message.created)}</div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatForm conversationId={params.id} />
      </div>
    </div>
  );
}
