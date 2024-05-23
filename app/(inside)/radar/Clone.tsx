import { createConversation } from "@/app/actions";
import { Channel, Clone, User } from "@/dbschema/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COLORS } from "../../../utils/constants";

export function CloneItem({
  clone,
  currentChannelIds,
}: {
  clone: Clone;
  currentChannelIds: Set<string>;
}) {
  const router = useRouter();

  return (
    <div
      className="p-4 rounded-lg hover:shadow-md transition-shadow"
      onClick={async () => {
        const convId = await createConversation(clone.id);
        router.replace(`/conversations/${convId}`);
        router.refresh();
      }}
    >
      <MatchCount count={clone.matchCount} />
      <div className="flex flex-col">
        <UserItem user={clone.other} isNew={!clone.conversation?.id} />
        <div className="flex flex-wrap gap-1">
          {clone.restrictedItems.map((item) => (
            <MatchItem
              key={item.id}
              channel={item}
              removed={!currentChannelIds.has(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchCount({ count }: { count: number }) {
  return (
    <div
      className={`h-10 rounded text-xl text-white font-bold flex items-center justify-center bg-${COLORS[count]}-500`}
    >
      {count}
    </div>
  );
}

function UserItem({
  user,
  isNew,
}: {
  user: User | null | undefined;
  isNew: boolean;
}) {
  if (!user) {
    return null;
  }
  return (
    <Link href={`http://github.com/${user.githubUsername}`}>
      <div>
        <span className="text-xl font-bold hover:underline">{user.name}</span>
        {isNew && (
          <span className="font-semibold text-sky-600"> - New clone !</span>
        )}
      </div>
    </Link>
  );
}

function MatchItem({
  channel,
  removed,
}: {
  channel: Channel;
  removed: boolean;
}) {
  return (
    <Link href={`https://www.youtube.com/channel/${channel.youtubeId}`}>
      <div
        className={`text-sm border rounded px-2 hover:shadow-md transition-shadow ${removed && "line-through"}`}
      >
        {channel.name}
      </div>
    </Link>
  );
}
