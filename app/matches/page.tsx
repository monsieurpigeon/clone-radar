import Matches from "@/components/Matches";
import { User } from "@/dbschema/interfaces";
import { auth } from "@/edgedb-client";
import { scanMatches } from "./actions";

export default async function MatchesPage() {
  const { client } = auth.getSession();

  const user = await client.query(`
    Select User {
      matches: {
        email,
        channels,
        restrictedChannels := (select .channels.name intersect global current_user.channels.name)
      }
    }
    filter .email = global current_user.email
  `);

  const matches = (user[0] as User)?.matches as Omit<
    User & { restrictedChannels: string[] },
    "created_by"
  >[];

  return (
    <>
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Matches
        </h1>
      </header>
      <form action={scanMatches}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Scan
        </button>
      </form>

      <Matches matches={matches} />
    </>
  );
}
