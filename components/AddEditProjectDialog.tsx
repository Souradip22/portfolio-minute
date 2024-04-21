import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export function AddEditProjectDialog({
  onAddProject,
  passedValues,
  action,
  index,
  onEditProject,
}: {
  onAddProject: any;
  passedValues?: any;
  action?: any;
  index?: any;
  onEditProject?: any;
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
      onEditProject(index, formValues);
    } else {
      onAddProject(formValues);
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
            Add project
          </button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Enter project details:</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="projectName"
                name="projectName"
                placeholder="Project Name"
                className="col-span-3"
                defaultValue={passedValues?.projectName}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Textarea
                id="projectDescription"
                name="projectDescription"
                placeholder="Project Description"
                className="col-span-3 resize-zone"
                defaultValue={passedValues?.projectDescription}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="repositoryUrl"
                name="repositoryUrl"
                placeholder="Repository URL"
                className="col-span-3"
                defaultValue={passedValues?.repositoryUrl}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="demoUrl"
                name="demoUrl"
                placeholder="Demo URL"
                className="col-span-3"
                defaultValue={passedValues?.demoUrl}
              />
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
