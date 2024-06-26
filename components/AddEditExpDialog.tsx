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
import { DialogHeader, DialogFooter, DialogTitle } from "./ui/dialog";
import { MdEdit } from "react-icons/md";

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
          <MdEdit className="w-3 h-3 cursor-pointer" />
        ) : (
          <button className="px-3 py-1 rounded-md border border-[#eee2] text-teal-300 font-semibold text-xs mt-1 hover:border-gray-400 hover:text-teal-400">
            Add more
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="dark:text-neutral-900">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {action == "edit" ? "Edit details" : "Add details"}
            </DialogTitle>
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
                        <SelectItem
                          key={index}
                          value={`${new Date().getFullYear() - index}`}
                        >
                          {new Date().getFullYear() - index}
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
                        <SelectItem
                          key={index}
                          value={`${new Date().getFullYear() - index}`}
                        >
                          {new Date().getFullYear() - index}
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
                    <SelectItem value="company">Experience</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                <span className="text-red-500">*</span>Please select a type
                under education or professional experience
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <button
              type="submit"
              className="py-2 px-3 bg-stone-800 rounded-md text-sm text-gray-200  max-w-[200px]"
            >
              save
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="py-2 px-3 text-stone-800 rounded-md text-sm bg-gray-200 max-w-[200px]"
              >
                close
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
