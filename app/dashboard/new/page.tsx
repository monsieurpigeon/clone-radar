import AddChannel from "@/components/AddChannel";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { auth } from "edgedb-client";
import Link from "next/link";

const addChannel = async (name: string) => {
  "use server";
  const session = auth.getSession();
  const result = await session.client.query(
    `
    with channel := (
      insert Channel { name := <str>$name }
      unless conflict on .name
      else Channel
    )
    update User
    filter .email = global current_user.email
    set {
      channels += channel
    }
  `,
    { name }
  );
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
