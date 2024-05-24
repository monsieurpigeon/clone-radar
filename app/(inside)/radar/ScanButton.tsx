"use client";

import { Button } from "@/components/ui/button";
import { COOLDOWN } from "@/utils/constants";
import { addMinutes, differenceInSeconds } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export function ScanButton({
  exhausted,
  nextTime,
}: {
  exhausted: boolean;
  nextTime: Date;
}) {
  const { pending } = useFormStatus();
  const [remaining, setRemaining] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!exhausted) return;
    const interval = setInterval(() => {
      const tmp = differenceInSeconds(
        addMinutes(nextTime, COOLDOWN),
        Date.now()
      );

      if (remaining && remaining <= 0) {
        clearInterval(interval);
        router.replace("/radar");
      }
      setRemaining(Math.max(tmp, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [exhausted, nextTime, remaining, router]);

  return (
    <Button type="submit" disabled={pending || exhausted}>
      <div className="flex items-center gap-4 min-w-8">
        {pending && (
          <span className="relative flex h-3 w-3">
            <span className="absolute animate-ping  h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="absolute rounded-full h-3 w-3 bg-green-800"></span>
            <span className="absolute animate-bounce rounded-full size-1 bg-green-300 top-1/3 left-1/3"></span>
          </span>
        )}
        {exhausted ? (
          <span className="w-full text-center">{remaining}</span>
        ) : (
          <span>{pending ? "Scanning..." : "Scan"}</span>
        )}
      </div>
    </Button>
  );
}
