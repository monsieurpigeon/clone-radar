"use client";

import { useRouter } from "next/navigation";
import posthog from "posthog-js";

export function DeleteButton({
  id,
  type,
  handleDelete,
}: {
  id: string;
  type: string;
  handleDelete: (id: string) => Promise<string | null>;
}) {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        const error = await handleDelete(id);
        if (error) {
          alert(error);
          return;
        }
        posthog.capture(`${type}_delete`);
        router.refresh();
      }}
      className="cursor-pointer text-sm border rounded-full absolute px-1 -top-2 -right-2 bg-red-300 text-white border-red-500 hover:bg-red-500"
    >
      X
    </div>
  );
}
