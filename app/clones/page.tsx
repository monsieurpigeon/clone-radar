import { User } from "@/dbschema/interfaces";
import { auth } from "@/edgedb-client";
import { scanMatches } from "./actions";
import Clones from "./Clones";

export default async function MatchesPage() {
  const { client } = auth.getSession();

  const user = await client.query(`
    Select User {
      clones: {
        email,
        channels,
        restrictedItems := (select .channels intersect global current_user.channels) {name, id, __type__: { name }}
      }
    }
    filter .email = global current_user.email
  `);

  const clones = (user[0] as User)?.clones as Omit<
    User & {
      restrictedItems: {
        id: string;
        name: string;
        __type__: { name: string };
      }[];
    },
    "created_by"
  >[];

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Clones
        </h1>
        <form action={scanMatches}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md font-semibold"
            type="submit"
          >
            Scan
          </button>
        </form>
      </header>

      <Clones clones={clones} />
    </div>
  );
}
