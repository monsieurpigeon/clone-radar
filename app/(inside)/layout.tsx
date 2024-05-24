import Navbar from "@/components/Navbar";
import { auth } from "edgedb-client";
import { redirect } from "next/navigation";

const handleSignOut = async () => {
  "use server";

  const { signout } = auth.createServerActions();
  await signout();
};

export default async function InsideLayout({
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
    <div className="h-full flex flex-col">
      <Navbar signedIn={signedIn} onSignOut={handleSignOut} />
      <div className="relative px-4 mt-8 sm:px-6 xl:px-16 grow">
        <main className="h-full">
          <div className="mx-auto max-w-7xl h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
