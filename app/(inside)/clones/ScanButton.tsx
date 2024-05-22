"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function ScanButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <div className="flex items-center gap-4">
        {pending && (
          <span className="relative flex h-3 w-3">
            <span className="absolute animate-ping  h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="absolute rounded-full h-3 w-3 bg-green-800"></span>
            <span className="absolute animate-bounce rounded-full size-1 bg-green-300 top-1/3 left-1/3"></span>
          </span>
        )}
        <span>{pending ? "Scanning..." : "Scan"}</span>
      </div>
    </Button>
  );
}
