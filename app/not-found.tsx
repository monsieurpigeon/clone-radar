import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col gap-4 items-center p-24 bg-slate-900 text-slate-50">
      <div className="text-3xl font-bold">404 : Not found!</div>
      <div>Good to see you there, tho</div>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/sJO0n6kvPRU?autoplay=1&start=116&controls=0showinfo=0&modestbranding=0&rel=0"
          title="YouTube video player"
          allow="autoplay;"
        ></iframe>
      </div>
      <Link href="/collection" className="hover:underline">
        Go back to your collection
      </Link>
    </div>
  );
}
