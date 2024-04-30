import { auth } from "@/edgedb-client";
import { revalidatePath } from "next/cache";

export async function scanMatches() {
  "use server";

  const { client } = auth.getSession();

  await client.query(`
    with myMatches := (SELECT User {
        email,
        channels: {
        name
        },
        matchCount := (with value := (select result := User.channels.name = global current_user.channels.name filter result = true) Select count(value))
    } filter .matchCount > 0 and .email != global current_user.email)
    update User
        filter .email = global current_user.email
    set {
      matches := myMatches
    }
  `);

  revalidatePath("/matches");
}
