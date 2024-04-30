import { User } from "@/dbschema/interfaces";

interface Props {
  matches: Omit<User & { restrictedChannels: string[] }, "created_by">[];
}

export default function Matches({ matches }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {matches.map((match) => (
        <li key={match.email} className="flex gap-x-4 py-5">
          <div className="flex-auto">
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {match.email}
              </p>
              <div>
                {match.restrictedChannels?.map((channel) => (
                  <div
                    key={channel}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {channel}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
