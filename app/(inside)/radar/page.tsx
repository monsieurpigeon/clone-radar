import { getMe, getMyClones } from "@/app/actions";
import { Clone, User } from "@/dbschema/interfaces";
import Clones from "./Clones";
import { FocusInput } from "./FocusInput";
import { PowerElement } from "./PowerElement";

export default async function ClonesPage() {
  const clones: Clone[] = (await getMyClones()) || [];
  const user: User | null = await getMe();

  return (
    <div className="max-w-xl mx-auto">
      <div
        className={`bg-red-500 bg-orange-500 bg-amber-500 bg-yellow-500
        bg-lime-500 bg-green-500 bg-emerald-500 bg-teal-500
        bg-cyan-500 bg-sky-500 bg-blue-500 bg-indigo-500
        bg-violet-500 bg-purple-500 bg-fuchsia-500 bg-pink-500
        border-red-500 border-orange-500 border-amber-500 border-yellow-500
        border-lime-500 border-green-500 border-emerald-500 border-teal-500
        border-cyan-500 border-sky-500 border-blue-500 border-indigo-500
        border-violet-500 border-purple-500 border-fuchsia-500 border-pink-500`}
      ></div>
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Clones
        </h1>

        <FocusInput
          user={user}
          slot={<PowerElement lastScans={user?.lastScans || []} />}
        />
      </header>

      <Clones clones={clones} currentChannels={user?.channels} />
    </div>
  );
}
