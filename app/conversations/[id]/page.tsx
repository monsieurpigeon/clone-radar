import { auth } from "@/edgedb-client";
import { sendMessage } from "./actions";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { client } = auth.getSession();
  const conversation = await client.querySingle(
    `Select Conversation { *,
        messages: { *, author: {*} }
    }
    filter .id = <uuid>$id`,
    { id: params.id }
  );

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Conversation
        </h1>
      </header>
      <div className="">
        <div>
          {conversation.messages?.map((message) => {
            return (
              <div>
                <div className="font-semibold">{message.author.email}</div>
                <div>{message.text}</div>
              </div>
            );
          })}
        </div>
        <div>
          <form action={sendMessage}>
            <input type="text" name="conversationId" value={params.id} hidden />
            <input type="text" name="message" />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
