import { Author } from "@/dbschema/interfaces";
import { auth } from "edgedb-client";
import DeleteAuthor from "./DeleteAuthor";

interface Props {
  authors: Omit<Author, "created_by">[];
}

const deleteAuthor = async (id: string) => {
  "use server";

  const session = auth.getSession();

  const res = await session.client.query(
    `
    with deletedAuthor := (
        select Author filter .id = <uuid>"${id}" limit 1
    )
    update User
        filter .email = global current_user.email
    set {
        authors := .authors except deletedAuthor
    }
    `
  );

  if (res.length === 0) {
    return "Cannot delete item";
  }

  return null;
};

export default function Authors({ authors }: Props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {authors.map((author) => (
        <li key={author.id} className="flex gap-x-4 py-5">
          <div className="flex-auto">
            <div className="flex items-center justify-between gap-x-4">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {author.name
                  .split(" ")
                  .map(
                    (p: string) => p.charAt(0).toUpperCase() + p.substring(1)
                  )
                  .join(" ")}
              </p>
              <DeleteAuthor author={author} handleDelete={deleteAuthor} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
