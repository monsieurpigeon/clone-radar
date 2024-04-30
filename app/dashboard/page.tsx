import Channels from "@/components/Channels";
import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import Link from "next/link";

export default async function Dashboard() {
  const { client } = auth.getSession();

  const user = await client.query(`
    Select User {
      channels: {*}
    }
    filter .email = global current_user.email
  `);

  const channels = (user[0] as User)?.channels;

  return (
    <>
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My favorite Channels
        </h1>
        <Link href="/dashboard/new">
          <button className="bg-primary text-white px-3 py-2 rounded-md text-xs font-semibold">
            + New Channel
          </button>
        </Link>
      </header>
      <Channels channels={channels} />
    </>
  );
}
