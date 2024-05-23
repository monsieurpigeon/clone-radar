import { getMe, getMyClones, scanMatches } from "@/app/actions";
import { Clone, User } from "@/dbschema/interfaces";
import Clones from "./Clones";
import { ScanButton } from "./ScanButton";

export default async function ClonesPage() {
  const clones: Clone[] = (await getMyClones()) || [];
  const user: User | null = await getMe();

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-red-500 bg-orange-500 bg-amber-500 bg-yellow-500 bg-lime-500 bg-green-500 bg-emerald-500 bg-teal-500 bg-cyan-500 bg-sky-500 bg-blue-500 bg-indigo-500 bg-violet-500 bg-purple-500 bg-fuchsia-500 bg-pink-500"></div>
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
