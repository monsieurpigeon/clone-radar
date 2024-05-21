"use client";

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
    <div
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
      className="show-target cursor-pointer text-sm border rounded-full absolute px-1 top-2 right-2 bg-red-300 text-white border-red-500 hover:bg-red-500"
    >
      Delete
    </div>
  );
}
