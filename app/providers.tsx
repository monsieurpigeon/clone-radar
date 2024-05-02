"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export function PostHogAuthWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  useEffect(() => {
    if (user?.id) {
      posthog.identify(user?.id, {
        email: user.email,
        name: user.name,
      });
    } else {
      posthog.reset();
    }
  }, [user, user?.id]);

  return children;
}

export function CSPostHogProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: any;
}) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper user={user}>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}
