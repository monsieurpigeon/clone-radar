"use server";
import { Channel } from "@/dbschema/interfaces";

// https://www.youtube.com/channel/UCVMAuwgr6s72Vlowid2EsbQ
// https://www.youtube.com/c/Zen%C3%A9mission
// https://www.youtube.com/c/YomiDenzel
// https://www.youtube.com/@t3dotgg

export async function searchChannels(youtubeUrl: string) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = "https://www.googleapis.com/youtube/v3/channels";
  const handleArray = youtubeUrl.split("/");
  const handle = handleArray[handleArray.length - 1];
  console.log(apiKey?.substring(0, 5) + "...");

  try {
    const data = await fetch(
      `${url}?part=snippet,statistics&forHandle=${handle}&key=${apiKey}`
    );

    return await data.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch youtube videos");
  }
}

export type ChannelInputProps = Omit<Channel, "id" | "fans">;
