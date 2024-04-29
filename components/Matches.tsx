interface Props {
  matches: {
    name: string;
  }[];
}

export default function Matches({ matches }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {matches.map((match) => (
        <li key={match.name} className="flex gap-x-4 py-5">
          <div className="flex-auto border rounded p-4">
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {match.name}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
