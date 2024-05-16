import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import { CollectionItem } from "./CollectionItem";
import { YoutubeInput } from "./YoutubeInput";

export default async function Collection() {
  const { client } = auth.getSession();

  const user: User | null = await client.querySingle(
    "select global current_user { *, channels: { * } };"
  );

  return (
    <>
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col gap-4">
          <YoutubeInput myCollection={[]} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xl font-bold leading-4 tracking-tight text-gray-900">
                My Collection
              </p>
            </div>
            <div className="grid grid-cols-4 grid-rows-4 gap-4 border-2 rounded-lg p-4 shadow-lg">
              {user &&
                user.channels
                  .sort((a, b) => a.subscriberCount - b.subscriberCount)
                  .map((item) => <CollectionItem key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
