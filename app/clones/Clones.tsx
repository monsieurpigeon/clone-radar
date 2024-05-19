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
            <div key={clone.other.email} className="flex gap-2">
              <div className="flex-auto">
                <div className="p-2 flex gap-2 bg-slate-400 rounded-xl">
                  <div className="text-2xl w-12 text-center bg-slate-700 rounded flex items-center justify-center text-white font-bold">
                    {clone.restrictedItems.length}
                  </div>
                  <div className="text-sm font-semibold flex-grow bg-slate-700 text-white p-2 rounded flex flex-col gap-2">
                    <div className="flex gap-4 text-xl justify-between">
                      <Link
                        href={`https://github.com/${clone.other?.githubUsername}`}
                      >
                        {clone.other?.githubUsername}
                      </Link>

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
                          defaultValue={clone.other.id || ""}
                          hidden
                        />
                        <button
                          type="submit"
                          className="hover:-translate-y-0.5"
                        >
                          <FiMail />
                        </button>
                      </form>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {clone.restrictedItems?.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 border rounded relative bg-slate-200 text-slate-900"
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
