"use client";
import Image from "next/image";
import { deleteChannel } from "./actions";
import { DeleteButton } from "./DeleteButton";

export function CollectionItem({ item }: { item: any }) {
  return (
    <div className="show-container relative">
      <div
        key={item.id}
        className="border rounded-lg relative cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
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
