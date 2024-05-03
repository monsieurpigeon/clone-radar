import AddAuthor from "@/components/author/AddAuthor";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { auth } from "edgedb-client";
import Link from "next/link";

const addAuthor = async (name: string) => {
  "use server";

  const cleanedName = name.toLowerCase();
  const session = auth.getSession();
  await session.client.query(
    `
    with author := (
      insert Author { name := <str>$name }
      unless conflict on .name
      else Author
    )
    update User
    filter .email = global current_user.email
    set {
      authors += author
    }
  `,
    { name: cleanedName }
  );
};

export default function NewAuthor() {
  return (
    <>
      <Link href="/collection">
        <button className="text-xs leading-6 text-gray-900">
          <ArrowLeftIcon className="h-4 w-4 inline-block" /> Back
        </button>
      </Link>
      <div className="mt-4">
        <AddAuthor addAuthor={addAuthor} />
      </div>
    </>
  );
}
