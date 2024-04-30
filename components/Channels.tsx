import { Channel } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import DeleteChannel from "./DeleteChannel";

interface Props {
  channels: Omit<Channel, "created_by">[];
}

const deleteChannel = async (id: string) => {
  "use server";
  const session = auth.getSession();

  const res = await session.client.query(
    `
    update User
      filter .email = global current_user.email
    set {
      channels := {}
    }
    `
  );

  if (res.length === 0) {
    return "Cannot delete item";
  }

  return null;
};

export default function Channels({ channels }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {channels.map((channel) => (
        <li key={channel.id} className="flex gap-x-4 py-5">
          <div className="flex-auto">
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {channel.name}
              </p>
              <DeleteChannel channel={channel} handleDelete={deleteChannel} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
