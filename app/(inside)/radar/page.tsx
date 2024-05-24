import { getMe, getMyClones } from "@/app/actions";
import { Clone, User } from "@/dbschema/interfaces";
import Clones from "./Clones";
import { RadarControl } from "./RadarControl";

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


        bg-red-200 bg-orange-200 bg-amber-200 bg-yellow-200
        bg-lime-200 bg-green-200 bg-emerald-200 bg-teal-200
        bg-cyan-200 bg-sky-200 bg-blue-200 bg-indigo-200
        bg-violet-200 bg-purple-200 bg-fuchsia-200 bg-pink-200

        border-red-500 border-orange-500 border-amber-500 border-yellow-500
        border-lime-500 border-green-500 border-emerald-500 border-teal-500
        border-cyan-500 border-sky-500 border-blue-500 border-indigo-500
        border-violet-500 border-purple-500 border-fuchsia-500 border-pink-500
        
        
        `}
      ></div>
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Clones
        </h1>
        <RadarControl user={user} />
      </header>
      <Clones clones={clones} currentChannels={user?.channels} />
    </div>
  );
}
