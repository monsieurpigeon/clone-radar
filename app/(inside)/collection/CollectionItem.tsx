"use client";
import Image from "next/image";
import { deleteChannel } from "./actions";
import { DeleteButton } from "./DeleteButton";

export function CollectionItem({
  item,
  isBackground,
  onClick,
}: {
  item: any;
  isBackground?: boolean;
  onClick?: () => void;
}) {
  const delay = Math.random() * 0.3 + 0.3;

  return (
    <div
      className="show-container relative collection-item"
      style={{ transitionDelay: `${delay}s` }}
      onClick={onClick}
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
  );
}
