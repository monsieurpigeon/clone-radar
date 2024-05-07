"use server";
import { auth } from "../../edgedb-client";

export const deleteChannel = async (id: string) => {
  const session = auth.getSession();

  const res = await session.client.query(
    `
      with deletedChannel := (
        select Channel filter .id = <uuid>"${id}" limit 1
      )
      update User
        filter .email = global current_user.email
      set {
        channels := .channels except deletedChannel
      }
      `
  );

  if (res.length === 0) {
    return "Cannot delete item";
  }

  return null;
};

export const deleteBoardGame = async (id: string) => {
  const session = auth.getSession();

  const res = await session.client.query(
    `
      with deletedBoardGame := (
          select BoardGame filter .id = <uuid>"${id}" limit 1
      )
      update User
          filter .email = global current_user.email
      set {
          boardGames := .boardGames except deletedBoardGame
      }
      `
  );

  if (res.length === 0) {
    return "Cannot delete item";
  }

  return null;
};

export const deleteAuthor = async (id: string) => {
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
