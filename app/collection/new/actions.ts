import { auth } from "edgedb-client";

export const addChannel = async (name: string) => {
  "use server";

  const cleanedName = name.replace(/[^a-zA-Z0-9@]/g, "");
  const session = auth.getSession();
  await session.client.query(
    `
      with channel := (
        insert Channel { name := <str>$name }
        unless conflict on .name
        else Channel
      )
      update User
      filter .email = global current_user.email
      set {
        channels += channel
      }
    `,
    { name: cleanedName }
  );
};

export const addBoardGame = async (name: string) => {
  "use server";

  const cleanedName = name.toLowerCase();
  const session = auth.getSession();
  await session.client.query(
    `
    with boardGame := (
      insert BoardGame { name := <str>$name }
      unless conflict on .name
      else BoardGame
    )
    update User
    filter .email = global current_user.email
    set {
      boardGames += boardGame
    }
  `,
    { name: cleanedName }
  );
};

export const addAuthor = async (name: string) => {
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
