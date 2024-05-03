import Channels from "@/components/channel/Channels";
import { User } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import Link from "next/link";
import BoardGames from "../../components/boardgame/BoardGames";

export default async function Collection() {
  const { client } = auth.getSession();

  const user = await client.querySingle(
    "select global current_user { *, channels: { * }, boardGames: { * } };"
  );

  const channels = (user as User)?.channels;
  const boardGames = (user as User)?.boardGames;

  return (
    <>
      <div className="max-w-xl mx-auto">
        <header className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            My Favorite YouTube Channels
          </h1>
          <Link href="/collection/channel/new">
            <button className="bg-primary text-white px-3 py-2 rounded-md font-semibold">
              + New Channel
            </button>
          </Link>
        </header>
        <Channels channels={channels} />
      </div>
      <div className="max-w-xl mx-auto">
        <header className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            My Favorite Board Games
          </h1>
          <Link href="/collection/boardgame/new">
            <button className="bg-primary text-white px-3 py-2 rounded-md font-semibold">
              + New Board Game
            </button>
          </Link>
        </header>
        <BoardGames boardGames={boardGames} />
      </div>
    </>
  );
}
