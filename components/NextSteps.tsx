/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import {
  CircleStackIcon,
  ListBulletIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

const timeline = [
  {
    id: 0,
    content: "Collect your favorite YouTube channels",
    description: (
      <div>
        Paste URL from any channel, video or short to collect a new YouTube
        Channel
      </div>
    ),
    icon: CircleStackIcon,
  },
  {
    id: 1,
    content: "Scan your clones on the radar",
    description: (
      <div>
        You will add the 5 users with the most matching channels to your clone
        list on each scan
      </div>
    ),
    icon: UserCircleIcon,
  },
  {
    id: 2,
    content: "Connect with your clones",
    description: (
      <div>
        You can open a conversation with your clones even if they scanned you
      </div>
    ),
    icon: ListBulletIcon,
  },
];

export default function NextSteps() {
  return (
    <div className="py-10">
      <h2 className="text-center text-2xl mb-6 font-bold tracking-tight text-gray-900 sm:text-3xl">
        How it works
      </h2>
      <div className="flow-root" suppressHydrationWarning>
        <ul role="list" className="-mb-8">
          {timeline.map((step, eventIdx) => (
            <li key={step.id}>
              <div className="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <span className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white">
                    <step.icon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="flex flex-col min-w-0 flex-1 pt-2 w-96">
                    <p className="text-sm text-gray-700 font-semibold">
                      {step.content}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      {step.description}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
