"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

export default function DeleteBoardGame({
  boardgame,
  handleDelete,
}: {
  boardgame: { id: string };
  handleDelete: (id: string) => Promise<string | null>;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm font-semibold text-red-600"
      onClick={async () => {
        const error = await handleDelete(boardgame.id);
        if (error) {
          alert(error);
          return;
        }
        posthog.capture("boardgame_delete");
        router.refresh();
      }}
    >
      <TrashIcon className="w-4 h-4" />
      <span className="sr-only">Delete</span>
    </button>
  );
}
