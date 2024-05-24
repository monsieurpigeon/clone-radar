"use client";

import posthog from "posthog-js";

export function SubscribePro({ feature }: { feature: string }) {
  return (
    <div
      onClick={() => {
        posthog.capture("click_subscribe_to_pro");
        alert("Thanks for showing interest in our PRO plan! 🚀");
      }}
      className="cursor-pointer border-2 rounded text-center mt-2 bg-purple-500 border-purple-600 text-white font-semibold hover:bg-purple-400"
    >
      Subscribe to a PRO account to unlock ✨{" "}
      <span className="font-bold italic">{feature}</span>
    </div>
  );
}
