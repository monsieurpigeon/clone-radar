import { auth } from "@/edgedb";
import Link from "next/link";

export default async function Home() {
  const session = auth.getSession();

  const signedIn = await session.isSignedIn();

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end space-x-2">
            {!signedIn ? (
              <>
                <Link
                  href={auth.getBuiltinUIUrl()}
                  className="text-sm font-semibold leading-6 text-gray-800"
                >
                  <button className="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md">
                    Sign in
                  </button>
                </Link>
                <Link
                  href={auth.getBuiltinUISignUpUrl()}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  <button className="bg-primary px-4 py-2 rounded-md text-white">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <Link
                href="dashboard"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <button className="bg-primary px-4 py-2 rounded-md text-white">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-16 sm:pt-24 lg:pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Clone Radar
            </h1>
            <div className="mt-6 text-base leading-7 text-gray-600">
              <div>You are unique in a lot of ways.</div>
              <div>
                One of them is the perfect combination of the things you love
                now.
              </div>
              <div>
                Pick the foundation of these things, meet the people who share
                the same,
              </div>
              <div>and together, build something amazing on top.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
