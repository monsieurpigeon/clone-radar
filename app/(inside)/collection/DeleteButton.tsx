"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

export function DeleteButton({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete: (id: string) => Promise<string | null>;
}) {
  const router = useRouter();
  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        const error = await handleDelete(id);
        if (error) {
          alert(error);
          return;
        }
        posthog.capture(`channel_delete`);
        router.refresh();
      }}
      className="show-target border-2 rounded-full absolute p-1 top-2 right-2 text-white hover:bg-opacity-60 hover:bg-slate-500 transition-all"
    >
      <XMarkIcon className="size-4" />
    </button>
  );
}
