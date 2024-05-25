import { auth } from "edgedb-client";
import { redirect } from "next/navigation";
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

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Messages
        </h1>
      </header>
      <div className="grid grid-cols-3 gap-2 grow h-full">
        <ConversationList>
          <div className="col-span-2 h-full">{children}</div>
        </ConversationList>
      </div>
    </div>
  );
}
