import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { addChannel } from "./actions";
import AddItem from "./AddItem";

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
