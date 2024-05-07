import { User } from "@/dbschema/interfaces";
import Link from "next/link";
import { CollectionItem } from "./CollectionItem";
import { CollectionType } from "./types";

export function CollectionSection({
  collection,
  user,
}: {
  collection: CollectionType;
  user: User | null;
}) {
  return (
    <div key={collection.type} className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-bold leading-4 tracking-tight text-gray-900">
          {collection.title}
        </p>
        <Link href={`/collection/new?type=${collection.type}`}>
          <button className="text-xl px-3 py-1 font-semibold">+</button>
        </Link>
      </div>
      <div className="flex gap-4">
        {user &&
          user[collection.objectKey]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <CollectionItem
                key={item.id}
                item={item}
                collection={collection}
              />
            ))}
      </div>
      <div className="border-b-slate-400 border-dashed border-b"></div>
    </div>
  );
}
