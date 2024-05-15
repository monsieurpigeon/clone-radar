import { getYoutubeVideos } from ".";

export async function YoutubeInput() {
  const videos = await getYoutubeVideos();

  return (
    <div className="flex items-center justify-center gap-4">
      <input />
      <button className="btn-primary">Add Channel</button>
      <pre>{JSON.stringify(videos, null, 4)}</pre>
    </div>
  );
}
