import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { UsernameForm } from "./UsernameForm";

export function UsernameDialog({
  isOpen,
  setUsername,
}: {
  isOpen: any;
  setUsername?: any;
}) {
  const [open, setOpen] = useState(isOpen);
  const optionalProp = { hideclosebtn: "true" };
  return (
    <Dialog open={open} onOpenChange={setOpen} {...optionalProp}>
      <DialogContent
        className="sm:max-w-md bg-white text-neutral-900"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        {...optionalProp}
      >
        <UsernameForm setOpen={setOpen} setUsername={setUsername} />
      </DialogContent>
    </Dialog>
  );
}
