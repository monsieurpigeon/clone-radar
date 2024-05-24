"use client";

import { scanMatches } from "@/app/actions";
import { COLORS, COOLDOWN, SCAN_LIMIT } from "@/utils/constants";
import { isAfter, subMinutes } from "date-fns";
import { ScanButton } from "./ScanButton";

export function PowerElement({ lastScans }: { lastScans: Date[] }) {
  const consumed = lastScans.filter((scan) =>
    isAfter(scan, subMinutes(new Date(), COOLDOWN))
  ).length;

  return (
    <>
      <button
        className={`rounded border border-y-4 px-2 ml-4 hover:bg-gray-200 border-${COLORS[SCAN_LIMIT - consumed]}-500`}
      >
        Power <span className="font-bold">{SCAN_LIMIT - consumed}</span>
      </button>
      <form action={scanMatches}>
        <ScanButton
          exhausted={SCAN_LIMIT - consumed <= 0}
          nextTime={lastScans[lastScans.length - 1]}
        />
      </form>
    </>
  );
}
