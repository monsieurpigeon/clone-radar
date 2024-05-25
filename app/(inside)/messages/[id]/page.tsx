import { getConversationById } from "@/app/actions";
import { SubscribePro } from "@/components/SubscribePro";
import { ChatForm } from "./ChatForm";
import { ChatWindow } from "./ChatWindow";
import { UserHeader } from "./UserHeader";

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
      <UserHeader conversation={conversation} />
      <div className="bg-slate-50 border rounded p-4 grow h-full">
        <div className="flex flex-col gap-4 h-full">
          <ChatWindow conversation={conversation} />
          <ChatForm conversationId={params.id} />
        </div>
      </div>
      <SubscribePro feature="SCROLLING" />
    </div>
  );
}
