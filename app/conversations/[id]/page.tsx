import { auth } from "@/edgedb-client";
import { Conversation, User } from "../../../dbschema/interfaces";
import { dateFormatter, durationFormatter } from "../../../utils/formatter";
import { sendMessage } from "./actions";

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { client } = auth.getSession();
  const conversation: (Conversation & { participant: User }) | null =
    await client.querySingle(
      `Select Conversation { *,
        participant := (SELECT assert_single((SELECT .participants filter .email != global current_user.email))){email},
        messages: { *, author: {*} }
    }
    filter .id = <uuid>$id`,
      { id: params.id }
    );

  if (!conversation) {
    return <div>Conversation not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex flex-col justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Conversation with {conversation.participant.email}
        </h1>
        <p>Since {dateFormatter(conversation.created)}</p>
      </header>
      <div className="">
        <div>
          {conversation.messages?.map((message) => {
            return (
              <div key={message.id}>
                <div className="font-semibold">{message.author.email}</div>
                <div>{durationFormatter(message.created)}</div>
                <div>{message.text}</div>
              </div>
            );
          })}
        </div>
        <div>
          <form action={sendMessage}>
            <input
              type="text"
              name="conversationId"
              defaultValue={params.id}
              hidden
            />
            <input type="text" name="message" />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
