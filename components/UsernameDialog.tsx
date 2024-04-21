import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        className="sm:max-w-md bg-white"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        {...optionalProp}
      >
        {/* <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader> */}
        <UsernameForm setOpen={setOpen} setUsername={setUsername} />
      </DialogContent>
    </Dialog>
  );
}
