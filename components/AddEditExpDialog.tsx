import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";

export function AddEduExpDialog({
  onAddItem,
  passedValues,
  action,
  index,
  onEditItem,
}: {
  onAddItem: any;
  passedValues?: any;
  action?: any;
  index?: any;
  onEditItem?: any;
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: any = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    if (action == "edit") {
      onEditItem(index, formValues);
    } else {
      onAddItem(formValues);
    }

    setOpen(false);
    e.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {action == "edit" ? (
          <FaRegEdit className="w-3 h-3 cursor-pointer" />
        ) : (
          <button className="px-3 py-1 rounded-md bg-gray-500 text-gray-50 font-semibold text-xs">
            Add details
          </button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogDescription>
              {action == "edit" ? "Edit details:" : "Enter details:"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="orgName"
                name="orgName"
                placeholder="University or organization Name"
                className="col-span-3"
                defaultValue={passedValues?.orgName}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Select name="fromDate" defaultValue={passedValues?.fromDate}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a from date  " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from(
                      { length: new Date().getFullYear() + 1 - 1970 },
                      (_, index) => (
                        <SelectItem key={index} value={`${index + 1970}`}>
                          {index + 1970}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name="toDate" defaultValue={passedValues?.toDate}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a to date  " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from(
                      { length: new Date().getFullYear() + 1 - 1970 },
                      (_, index) => (
                        <SelectItem key={index} value={`${index + 1970}`}>
                          {index + 1970}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="location"
                name="location"
                placeholder="Location (e.g. Bangalore, India)"
                className="col-span-3"
                defaultValue={passedValues?.location}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="designation"
                name="designation"
                placeholder="Designation (e.g. Student, Software Engineer)"
                className="col-span-3"
                defaultValue={passedValues?.designation}
              />
            </div>
            <div className="className">
              <Select name="type" defaultValue={passedValues?.type}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="school">Education</SelectItem>
                    <SelectItem value="company">
                      Professional Experience
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" variant={"destructive"}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
