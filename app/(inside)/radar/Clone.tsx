import { createConversation } from "@/app/actions";
import { Channel, Clone, User } from "@/dbschema/interfaces";
import githubLogo from "@/public/github.svg";
import { COLORS } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CloneItem({
  clone,
  currentChannelIds,
}: {
  clone: Clone;
  currentChannelIds: Set<string>;
}) {
  const router = useRouter();

  return (
    <div className="rounded-lg flex gap-4 cursor-pointer">
      <MatchCount count={clone.matchCount} />
      <div className="flex flex-col">
        <UserItem
          user={clone.other}
          isNew={!clone.conversation?.id}
          cloneId={clone.id}
        />
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
      className={`size-10 grow-0 shrink-0 rounded text-xl text-white font-bold flex items-center justify-center bg-${COLORS[count]}-500`}
    >
      {count}
    </div>
  );
}

function UserItem({
  user,
  isNew,
  cloneId,
}: {
  user: User | null | undefined;
  isNew: boolean;
  cloneId: string;
}) {
  const router = useRouter();
  if (!user) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xl font-bold hover:underline"
        onClick={async () => {
          const convId = await createConversation(cloneId);
          router.replace(`/messages/${convId}`);
          router.refresh();
        }}
      >
        {user.name}
      </span>

      <Link href={`https://github.com/${user.githubUsername}`}>
        <Image
          src={githubLogo}
          alt="Follow us on Twitter"
          width={20}
          height={20}
        />
      </Link>

      {isNew && (
        <span className="font-semibold text-sky-600"> - New clone !</span>
      )}
    </div>
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
