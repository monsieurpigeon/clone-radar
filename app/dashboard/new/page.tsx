import AddChannel from "@/components/AddChannel";
import e from "@/dbschema/edgeql-js";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { auth } from "edgedb-client";
import Link from "next/link";

const addChannel = async (name: string) => {
  "use server";
  const session = auth.getSession();

  const newChannelQuery = e.insert(e.Channel, {
    name,
  });

  newChannelQuery.run(session.client);
};

export default function Example() {
  return (
    <>
      <Link href="/dashboard">
        <button className="text-xs leading-6 text-gray-900">
          <ArrowLeftIcon className="h-4 w-4 inline-block" /> Back
        </button>
      </Link>
      <div className="mt-4">
        <AddChannel addChannel={addChannel} />
      </div>
    </>
  );
}
