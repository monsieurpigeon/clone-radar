"use client";

import { User } from "@/dbschema/interfaces";
import { useRouter } from "next/navigation";
import { createConversation } from "../app/clones/actions";

interface Props {
  clones: Omit<
    User & {
      restrictedItems: {
        id: string;
        name: string;
        __type__: { name: string };
      }[];
    },
    "created_by"
  >[];
}

const TYPES = {
  Channel: "Youtube Channel",
  BoardGame: "Board Game",
  Author: "Author",
};

export default function Clones({ clones }: Props) {
  const router = useRouter();

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {clones &&
        clones.map((clone) => (
          <li key={clone.email} className="flex gap-x-4 py-5">
            <div className="flex-auto">
              <div className="flex items-center justify-between gap-x-4">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {clone.email}
                </div>
                <div>
                  {clone.restrictedItems.length} match
                  {clone.restrictedItems.length > 1 && "es"}
                </div>
                <div>
                  {Object.entries(TYPES).map(([key, value]) => {
                    return (
                      <div key={key}>
                        <div>{value}</div>
                        {clone.restrictedItems
                          ?.filter((item) => {
                            return item.__type__.name.split("::")[1] === key;
                          })
                          .map((item) => (
                            <div
                              key={item.id}
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              {item.name}
                            </div>
                          ))}
                      </div>
                    );
                  })}
                </div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const previous = await createConversation(
                      new FormData(e.target as HTMLFormElement) as FormData
                    );
                    router.replace(`/conversations/${previous[0].id}`);
                    router.refresh();
                  }}
                >
                  <input
                    type="text"
                    name="email"
                    value={clone.email || ""}
                    hidden
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-semibold"
                    type="submit"
                  >
                    Contact
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
