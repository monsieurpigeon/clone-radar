import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import { YoutubeCollection } from "./YoutubeCollection";

export default async function Collection() {
  const { client } = auth.getSession();

  const user: User | null = await client.querySingle(
    "select global current_user { *, channels: { * } };"
  );

  return (
    <>
      <div className="max-w-xl mx-auto">
        <YoutubeCollection channels={user?.channels} />
      </div>
    </>
  );
}
