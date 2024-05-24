import { getConversationById } from "@/app/actions";
import { SubscribePro } from "@/components/SubscribePro";
import { durationFormatter } from "@/utils/formatter";
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
    <div className="h-full flex flex-col">
      <div className="bg-slate-50 border rounded p-4 grow h-full">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col-reverse gap-2 max-h-full grow overflow-y-hidden">
            {conversation.lastMessages?.map((message) => {
              const isOther = message.author.id === conversation.participant.id;
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isOther ? "self-start items-start" : "self-end items-end"}`}
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
      <SubscribePro feature="scrolling" />
    </div>
  );
}
