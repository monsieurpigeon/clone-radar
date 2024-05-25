"use client";

import { useEffect } from "react";
import { useUnreadStore } from "../store/zustand";

export function UnreadBadge() {
  const { count, update } = useUnreadStore();

  useEffect(() => {
    const timeout = setInterval(() => {
      update();
    }, 10000);
    update();
    return () => clearTimeout(timeout);
  }, [update]);

  if (count === 0) {
    return null;
  }
  return (
    <div className="ml-2 px-2 text-center font-bold border-2 border-red-300 text-white rounded-xl bg-red-700">
      {count}
    </div>
  );
}
