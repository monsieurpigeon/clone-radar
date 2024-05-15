export async function getYoutubeVideos() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  const url = process.env.NEXT_PUBLIC_YOUTUBE_API_URL;

  try {
    const data = await fetch(
      `${url}?part=snippet&channelId=${channelId}&key=${apiKey}`
    );

    if (!data.ok) throw new Error("Failed to fetch youtube videos");

    return await data.json();
  } catch (error) {
    throw new Error("Failed to fetch youtube videos");
  }
}
