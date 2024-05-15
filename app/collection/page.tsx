import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import { deleteChannel } from "./actions";
import { CollectionSection } from "./CollectionSection";
import { CollectionType } from "./types";
import { YoutubeInput } from "./YoutubeInput";

const collectionList: CollectionType[] = [
  {
    title: "Youtube Channels",
    type: "youtube",
    objectKey: "channels",
    handleDelete: deleteChannel,
  },
];

export default async function Collection() {
  const { client } = auth.getSession();

  const user: User | null = await client.querySingle(
    "select global current_user { *, channels: { * } };"
  );

  return (
    <>
      <div className="max-w-xl mx-auto">
        <header className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            My Collection
          </h1>
        </header>
        <div className="flex flex-col gap-4">
          <div className="border-b-slate-400 border-dashed border-b"></div>
          <YoutubeInput />

          {collectionList.map((collection) => {
            return (
              <CollectionSection
                key={collection.type}
                collection={collection}
                user={user}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
