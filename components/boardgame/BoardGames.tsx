import { BoardGame } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import DeleteBoardGame from "./DeleteBoardGame";

interface Props {
  boardGames: Omit<BoardGame, "created_by">[];
}

const deleteBoardGame = async (id: string) => {
  "use server";

  const session = auth.getSession();

  const res = await session.client.query(
    `
    with deletedBoardGame := (
        select BoardGame filter .id = <uuid>"${id}" limit 1
    )
    update User
        filter .email = global current_user.email
    set {
        boardGames := .boardGames except deletedBoardGame
    }
    `
  );

  if (res.length === 0) {
    return "Cannot delete item";
  }

  return null;
};

export default function BoardGames({ boardGames }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {boardGames.map((boardGame) => (
        <li key={boardGame.id} className="flex gap-x-4 py-5">
          <div className="flex-auto">
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {boardGame.name
                  .split(" ")
                  .map(
                    (p: string) => p.charAt(0).toUpperCase() + p.substring(1)
                  )
                  .join(" ")}
              </p>
              <DeleteBoardGame
                boardgame={boardGame}
                handleDelete={deleteBoardGame}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
