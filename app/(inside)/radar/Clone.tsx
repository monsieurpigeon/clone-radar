import { createConversation } from "@/app/actions";
import { Channel, Clone, User } from "@/dbschema/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";
import { COLORS } from "../../../utils/constants";

export function CloneItem({
  clone,
  currentChannelIds,
}: {
  clone: Clone;
  currentChannelIds: Set<string>;
}) {
  return (
    <>
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
      <div className="flex justify-end">
        <ContactButton id={clone.id} />
      </div>
    </>
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
      <div className="text-xl">
        {user.name}
        {isNew && <span className="font-bold text-base"> - New clone !</span>}
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

function ContactButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const convId = await createConversation(id);
        router.replace(`/conversations/${convId}`);
        router.refresh();
      }}
      className="h-2 text-3xl hover:text-blue-500 transition-colors"
    >
      <FiMail />
    </button>
  );
}
