import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import { CollectionList } from "./CollectionList";
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
            <CollectionList channels={user?.channels} />
          </div>
        </div>
      </div>
    </>
  );
}
