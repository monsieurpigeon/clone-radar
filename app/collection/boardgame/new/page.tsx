import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { auth } from "edgedb-client";
import Link from "next/link";
import AddBoardGame from "../../../../components/boardgame/AddBoardGame";

const addBoardGame = async (name: string) => {
  "use server";

  const cleanedName = name.toLowerCase();
  const session = auth.getSession();
  await session.client.query(
    `
    with boardGame := (
      insert BoardGame { name := <str>$name }
      unless conflict on .name
      else BoardGame
    )
    update User
    filter .email = global current_user.email
    set {
      boardGames += boardGame
    }
  `,
    { name: cleanedName }
  );
};

export default function NewBoardGame() {
  return (
    <>
      <Link href="/collection">
        <button className="text-xs leading-6 text-gray-900">
          <ArrowLeftIcon className="h-4 w-4 inline-block" /> Back
        </button>
      </Link>
      <div className="mt-4">
        <AddBoardGame addBoardGame={addBoardGame} />
      </div>
    </>
  );
}
