import Channels from "@/components/Channels";
import e from "@/dbschema/edgeql-js";
import { auth } from "edgedb-client";
import Link from "next/link";

export default async function Dashboard() {
  const { client } = auth.getSession();

  const channelsQuery = e.select(e.Channel, (_channel) => ({
    id: true,
    name: true,
    created: true,
    updated: true,
    created_by: {
      name: true,
      email: true,
    },
    filter: e.op(_channel.created_by, "=", e.global.current_user),
  }));

  const channels = await channelsQuery.run(client);

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
