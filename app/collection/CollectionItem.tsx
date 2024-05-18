"use client";
import Image from "next/image";
import Link from "next/link";
import { deleteChannel } from "./actions";
import { DeleteButton } from "./DeleteButton";

export function CollectionItem({
  item,
  isBackground,
}: {
  item: any;
  isBackground?: boolean;
}) {
  const delay = Math.random() * 0.3 + 0.3;

  return (
    <Link href={`https://www.youtube.com/channel/${item.youtubeId}`}>
      <div
        className="show-container relative collection-item"
        style={{ transitionDelay: `${delay}s` }}
      >
        <div
          key={item.id}
          className="rounded-lg relative cursor-pointer overflow-hidden"
        >
          <Image
            width={300}
            height={300}
            src={item.thumbnailUrl}
            alt={item.name}
          />
        </div>
        {!isBackground && (
          <DeleteButton id={item.id} handleDelete={deleteChannel} />
        )}
      </div>
    </Link>
  );
}
