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
