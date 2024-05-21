"use client";

import { Clone } from "@/dbschema/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";
import { createConversation } from "./actions";

interface Props {
  clones: Clone[];
}

export default function Clones({ clones }: Props) {
  const router = useRouter();
  return (
    <ul role="list" className="flex flex-col gap-4">
      {clones
        ? clones?.map((clone) => (
            <div key={clone.other[0].email} className="flex gap-2">
              <div className="flex-auto">
                <div className="p-2 flex gap-2 bg-slate-400 rounded-xl">
                  <div className="w-12 text-center bg-slate-700 rounded flex items-center justify-center text-white">
                    {clone.restrictedItems.length}
                  </div>
                  <div className="flex-grow bg-slate-700 text-white p-2 rounded flex flex-col gap-2">
                    <div className="flex gap-4 justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="font-semibold">
                          {clone.other[0]?.name}
                        </div>
                        <Link
                          href={`https://github.com/${clone.other[0]?.githubUsername}`}
                        >
                          <div>@{clone.other[0]?.githubUsername}</div>{" "}
                        </Link>
                      </div>

                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const previous = await createConversation(
                            new FormData(
                              e.target as HTMLFormElement
                            ) as FormData
                          );
                          router.replace(`/conversations/${previous[0].id}`);
                          router.refresh();
                        }}
                      >
                        <input
                          type="text"
                          name="otherId"
                          defaultValue={clone.other[0].id || ""}
                          hidden
                        />
                        <button
                          type="submit"
                          className="hover:-translate-y-0.5 text-xl"
                        >
                          <FiMail />
                        </button>
                      </form>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {clone.restrictedItems?.map((item) => (
                        <div
                          key={item.id}
                          className="px-1 border rounded relative bg-slate-200 text-slate-900"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : "no clones found yet"}
    </ul>
  );
}
