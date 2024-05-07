"use client";
import { useState } from "react";
import { capitalize } from "../../utils/formatter";
import { DeleteButton } from "./DeleteButton";
import { CollectionType } from "./types";

export function CollectionItem({
  item,
  collection,
}: {
  item: any;
  collection: CollectionType;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={item.id}
      className="px-4 py-2 border rounded relative cursor-pointer hover:bg-gray-100"
    >
      <p>{collection.capitalize ? capitalize(item.name) : item.name}</p>
      {hover && (
        <DeleteButton
          id={item.id}
          type={collection.type}
          handleDelete={collection.handleDelete}
        />
      )}
    </div>
  );
}
