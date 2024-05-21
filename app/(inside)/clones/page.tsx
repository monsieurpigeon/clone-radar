import { getMyClones, scanMatches } from "@/app/actions";
import { Clone } from "@/dbschema/interfaces";
import Clones from "./Clones";
import { ScanButton } from "./ScanButton";

export default async function MatchesPage() {
  const clones: Clone[] = (await getMyClones()) || [];

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

      <Clones clones={clones} />
    </div>
  );
}
