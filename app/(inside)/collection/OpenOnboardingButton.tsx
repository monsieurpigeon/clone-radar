"use client";

import { useRouter } from "next/navigation";

export function OpenOnboardingButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/collection/onboarding");
      }}
    >
      Open ONBOARDING
    </button>
  );
}
