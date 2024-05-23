"use client";
import { updateThreshold } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { User } from "@/dbschema/interfaces";
import { ReactNode, useState } from "react";

export function PowerInput({
  user,
  slot,
}: {
  user: User | null;
  slot: ReactNode;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value = 3, setValue] = useState<number>(user?.threshold || 3);

  return (
    <>
      {isEditing ? (
        <>
          <div className="grid grid-cols-8 grow mx-10">
            <div className="col-span-7 flex items-center">
              <Slider
                defaultValue={[user?.threshold || 3]}
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
              setIsEditing(false);
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)} className="grow">
            Power: {user?.threshold}
          </button>
          {slot}
        </>
      )}
    </>
  );
}
