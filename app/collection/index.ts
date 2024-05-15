export async function searchChannels(youtubeUrl: string) {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  const url = "https://www.googleapis.com/youtube/v3/channels";

  try {
    const data = await fetch(
      `${url}?part=snippet,statistics&forHandle=${youtubeUrl.split("/")[3]}&key=${apiKey}`
    );

    if (!data.ok) throw new Error("Failed to fetch youtube videos");

    return await data.json();
  } catch (error) {
    throw new Error("Failed to fetch youtube videos");
  }
}
