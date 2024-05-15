import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import { deleteChannel } from "./actions";
import { CollectionSection } from "./CollectionSection";
import { CollectionType } from "./types";
import { YoutubeInput } from "./YoutubeInput";

const collectionList: CollectionType[] = [
  {
    title: "My Collection",
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
        <div className="flex flex-col gap-4">
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
