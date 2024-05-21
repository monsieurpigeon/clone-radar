import { getMe, getMyClones, scanMatches } from "@/app/actions";
import { Clone, User } from "@/dbschema/interfaces";
import Clones from "./Clones";
import { ScanButton } from "./ScanButton";

export default async function ClonesPage() {
  const clones: Clone[] = (await getMyClones()) || [];
  const user: User | null = await getMe();

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Clones
        </h1>
        <form action={scanMatches}>
          <ScanButton />
        </form>
      </header>

      <Clones clones={clones} currentChannels={user?.channels} />
    </div>
  );
}
