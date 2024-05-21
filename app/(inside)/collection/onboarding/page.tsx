"use client";

import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  router.replace("/collection");
  return (
    <div>
      <div>Onboarding</div>
    </div>
  );
}
