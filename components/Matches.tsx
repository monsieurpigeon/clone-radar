import { User } from "@/dbschema/interfaces";

interface Props {
  matches: Omit<
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

export default function Matches({ matches }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {matches.map((match) => (
        <li key={match.email} className="flex gap-x-4 py-5">
          <div className="flex-auto">
            <div className="flex items-center justify-between gap-x-4">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                {match.email}
              </div>
              <div>{match.restrictedItems.length}</div>
              <div>
                {Object.entries(TYPES).map(([key, value]) => {
                  return (
                    <div key={key}>
                      <div>{value}</div>
                      {match.restrictedItems
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
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
