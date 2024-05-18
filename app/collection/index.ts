"use server";
import { Channel } from "@/dbschema/interfaces";

// https://www.youtube.com/channel/UCVMAuwgr6s72Vlowid2EsbQ
// https://www.youtube.com/c/YomiDenzel
// https://www.youtube.com/@t3dotgg
// https://www.youtube.com/watch?v=yEyr-M0AdSE&ab_channel=ZenEmission
// https://www.youtube.com/shorts/fNislO_Om5A

type SearchType = "channel" | "video";

function getSearchType(youtubeUrl: string): SearchType {
  if (youtubeUrl.includes("watch") || youtubeUrl.includes("shorts")) {
    return "video";
  } else {
    return "channel";
  }
}

function getVideoId(youtubeUrl: string): string {
  const url = new URL(youtubeUrl);
  if (youtubeUrl.includes("shorts")) {
    return url.pathname.split("/").pop() || "";
  } else {
    return url.searchParams.get("v") || "";
  }
}

function getChannelHandle(youtubeUrl: string): string {
  const url = new URL(youtubeUrl);
  return url.pathname.split("/").pop() || "";
}

function isAnId(handle: string): boolean {
  return (
    handle.length === 24 &&
    /^[0-9a-zA-Z]{24}$/.test(handle) &&
    handle.startsWith("UC")
  );
}

export async function searchChannels(youtubeUrl: string) {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const url = "https://www.googleapis.com/youtube/v3/";

  const searchType: SearchType = getSearchType(youtubeUrl);

  try {
    switch (searchType) {
      case "channel": {
        const handle = getChannelHandle(youtubeUrl);
        const channelData = await fetch(
          `${url}channels?part=snippet,statistics&${isAnId(handle) ? "id" : "forHandle"}=${handle}&key=${apiKey}`
        );

        return await channelData.json();
      }
      case "video": {
        const videoId = getVideoId(youtubeUrl);
        const data = await fetch(
          `${url}videos?part=snippet&id=${videoId}&key=${apiKey}`
        );
        const jsonData = await data.json();
        const channelId = jsonData.items[0].snippet.channelId;
        const channelData = await fetch(
          `${url}channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
        );
        return await channelData.json();
      }
      default: {
        throw new Error("Bad URL format");
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch youtube videos");
  }
}

export type ChannelInputProps = Omit<Channel, "id" | "fans">;
