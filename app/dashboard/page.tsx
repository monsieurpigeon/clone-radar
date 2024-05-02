import Channels from "@/components/Channels";
import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import Link from "next/link";

export default async function Dashboard() {
  const { client } = auth.getSession();

  const user = await client.querySingle(
    "select global current_user { *, channels: { * } };"
  );

  const channels = (user as User)?.channels;

  return (
    <div className="max-w-xl mx-auto">
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My favorite YouTube Channels
        </h1>
        <Link href="/dashboard/new">
          <button className="bg-primary text-white px-3 py-2 rounded-md font-semibold">
            + New Channel
          </button>
        </Link>
      </header>
      <Channels channels={channels} />
    </div>
  );
}
