import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { auth } from "edgedb-client";
import Link from "next/link";
import { addBoardGame, addChannel } from "./actions";
import AddItem from "./AddItem";

const addAuthor = async (name: string) => {
  "use server";

  const cleanedName = name.toLowerCase();
  const session = auth.getSession();
  await session.client.query(
    `
    with author := (
      insert Author { name := <str>$name }
      unless conflict on .name
      else Author
    )
    update User
    filter .email = global current_user.email
    set {
      authors += author
    }
  `,
    { name: cleanedName }
  );
};

const collectionTypes: {
  [key: string]: {
    addItem: (name: string) => Promise<void>;
    type: string;
    title: string;
    placeholder: string;
  };
} = {
  youtube: {
    title: "Youtube Channel",
    placeholder: "@t3dotgg",
    type: "channel",
    addItem: addChannel,
  },
  boardgame: {
    title: "Board Game",
    placeholder: "Pandemic",
    type: "boardgame",
    addItem: addBoardGame,
  },
  author: {
    title: "Author",
    placeholder: "George Orwell",
    type: "author",
    addItem: addAuthor,
  },
};

export default function NewCollectionItem({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  return (
    <>
      <Link href="/collection">
        <button className="text-xs leading-6 text-gray-900">
          <ArrowLeftIcon className="h-4 w-4 inline-block" /> Back
        </button>
      </Link>
      <div className="mt-4">
        <AddItem {...collectionTypes[searchParams.type]} />
      </div>
    </>
  );
}
