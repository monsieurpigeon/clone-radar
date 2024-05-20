import { Clone } from "@/dbschema/interfaces";
import { auth } from "@/edgedb-client";
import { scanMatches } from "./actions";
import Clones from "./Clones";
import { ScanButton } from "./ScanButton";

export default async function MatchesPage() {
  const { client } = auth.getSession();

  const clones: Clone[] = await client.query(`
    SELECT Clone {
      matchCount,
      users: {id, name, githubUsername},
      restrictedItems: {name, id},
      other: {id, name, githubUsername}
    }
    filter global current_user in .users
    order by .matchCount DESC
  `);

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
