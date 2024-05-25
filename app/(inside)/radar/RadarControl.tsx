"use client";

import { scanMatches, updateThreshold } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { User } from "@/dbschema/interfaces";
import { COLORS, COOLDOWN, SCAN_LIMIT } from "@/utils/constants";
import { isAfter, subMinutes } from "date-fns";
import { useState } from "react";
import { ScanButton } from "./ScanButton";

export function RadarControl({ user }: { user: User | null }) {
  const [isEditing, setEditing] = useState(false);
  const [value = 3, setValue] = useState<number>(user?.threshold || 3);
  const lastScans = user?.lastScans || [];
  const consumed =
    lastScans.filter((scan) => isAfter(scan, subMinutes(new Date(), COOLDOWN)))
      .length || 0;

  return (
    <div className="grow px-4">
      {isEditing ? (
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-8 grow mx-10">
            <div className="col-span-7 flex items-center">
              <Slider
                defaultValue={[user?.threshold || 3]}
                min={1}
                max={16}
                step={1}
                onValueChange={(e) => {
                  setValue(e[0]);
                }}
                value={[value]}
              />
            </div>
            <div className="text-right">{value}</div>
          </div>

          <Button
            variant="outline"
            onClick={async () => {
              await updateThreshold(value);
              setEditing(false);
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <div className="flex justify-between align-middle">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setEditing(true)}
              className={`rounded-full border px-2 bg-${COLORS[user?.threshold]}-200 border-b-4 border-${COLORS[user?.threshold]}-500`}
            >
              Focus <span className="font-bold">{user?.threshold}</span>
            </button>
            <button
              className={`rounded border border-b-4 px-2 bg-${COLORS[SCAN_LIMIT - consumed]}-200 border-${COLORS[SCAN_LIMIT - consumed]}-500`}
              onClick={() => {
                alert(
                  "1 Scan costs 1 Power\nA Power is refreshed after 1 hour\nGet a PRO plan to unlock ✨ UNLIMITED POWER"
                );
              }}
            >
              Power <span className="font-bold">{SCAN_LIMIT - consumed}</span>
            </button>
          </div>
          <form action={scanMatches}>
            <ScanButton
              exhausted={SCAN_LIMIT - consumed <= 0}
              nextTime={lastScans[lastScans.length - 1]}
            />
          </form>
        </div>
      )}
    </div>
  );
}
