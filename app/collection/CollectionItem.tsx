"use client";
import Image from "next/image";
import { deleteChannel } from "./actions";
import { DeleteButton } from "./DeleteButton";

export function CollectionItem({ item }: { item: any }) {
  return (
    <div className="show-container relative">
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
      <DeleteButton id={item.id} handleDelete={deleteChannel} />
    </div>
  );
}
