"use client";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  InterceptedDialogContent,
} from "@/components/ui/dialog";

export default function OnboardingPage() {
  return (
    <Dialog open>
      <InterceptedDialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </InterceptedDialogContent>
    </Dialog>
  );
}
