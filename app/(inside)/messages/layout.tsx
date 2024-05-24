import { getConversations } from "@/app/actions";
import { auth } from "edgedb-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EmptyState } from "../../../components/EmptyState";
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
  const conversations = await getConversations();

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Messages
        </h1>
      </header>
      <div className="grid grid-cols-3 gap-4 grow h-full">
        {conversations.length > 0 ? (
          <>
            <div className="">
              <ConversationList conversations={conversations} />
            </div>
            <div className="col-span-2 h-full">{children}</div>
          </>
        ) : (
          <div className="col-span-3 p-8">
            <Link href="/radar">
              <EmptyState
                title="No conversation yet..."
                description={[
                  "Scan some clones and click their names to open a new conversation.",
                  "If you lose a clone, the conversation will be destroyed.",
                  "Only the last 10 messages are stored in the conversation.",
                ]}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
