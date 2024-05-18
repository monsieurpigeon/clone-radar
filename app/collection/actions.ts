"use server";
import { auth } from "@/edgedb-client";
import { ChannelInputProps } from ".";

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

export const addChannel = async (channel: ChannelInputProps) => {
  const session = auth.getSession();
  console.log("addChannel", channel);

  const res = await session.client.query(
    `
      with newChannel := (
        insert Channel {
          name := <str>$name,
          youtubeId := <str>$youtubeId,
          description := <str>$description,
          thumbnailUrl := <str>$thumbnailUrl,
          subscriberCount := <int64>$subscriberCount,
          videoCount := <int64>$videoCount
        }
        unless conflict on .youtubeId
        else (
          update Channel set {
            name := <str>$name,
            description := <str>$description,
            thumbnailUrl := <str>$thumbnailUrl,
            subscriberCount := <int64>$subscriberCount,
            videoCount := <int64>$videoCount
          }
        )
      )
      update User
        filter .email = global current_user.email
      set {
        channels += newChannel
      }
      `,
    {
      youtubeId: channel.youtubeId,
      name: channel.name,
      description: channel.description,
      thumbnailUrl: channel.thumbnailUrl,
      subscriberCount: channel.subscriberCount,
      videoCount: channel.videoCount,
    }
  );
  console.log(res);

  if (res.length === 0) {
    return "Cannot add item";
  }

  return null;
};
