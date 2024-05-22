import { User } from "@/dbschema/interfaces";
import { getMe } from "../../actions";
import { YoutubeCollection } from "./YoutubeCollection";

export default async function Collection() {
  const user: User | null = await getMe();

  return (
    <div className="max-w-xl mx-auto">
      <YoutubeCollection channels={user?.channels} />
    </div>
  );
}
