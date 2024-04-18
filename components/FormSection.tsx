"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";

import MultipleSelector, { Option } from "@/components/ui/multi-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { formDefaultValues } from "@/lib/defaultValues";
import { skillNames } from "@/lib/constants";

import { socialLinksSVGs } from "./social-links";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTheme } from "next-themes";

const filenames = skillNames;

const skillOptions: Option[] = filenames.map((filename) => ({
  label: filename
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "), // Capitalize each word in the label
  value: filename, // Use the filename as the value
}));

export const profileFormSchema = z.object({
  font: z.enum(["font_1", "font_2", "font_3"]).optional(),
  theme: z.enum(["purple", "amber", "lime", "indigo", "pink"]).optional(),
  shortname: z
    .string()
    .min(2, {
      message: "Short name must be at least 2 characters.",
    })
    .max(10, {
      message: "Short name must not be longer than 10 characters.",
    }),
  fullName: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters.",
    })
    .max(20, {
      message: "Full name must not be longer than 20 characters.",
    }),
  bio: z
    .string()
    .min(10, {
      message: "Profile description must be at least 10 characters.",
    })
    .max(200, {
      message: "Profile description cannot be longer than 200 characters.",
    }),
  experience: z.string().min(0).max(90).optional(),
  completedProjects: z.string().min(0).max(1000).optional(),
  isOpenToWork: z.boolean().default(true).optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .optional(),

  phone: z
    .string()
    .min(10, {
      message: "phone must be at least 2 characters.",
    })
    .max(14, {
      message: "Phone must not be longer than 14 characters.",
    })
    .optional(),
  skills: z
    .array(
      z.object({
        label: z.string().max(20).min(2),
        value: z.string().max(20).min(2),
      })
    )
    .optional(),
  socialLinks: z
    .array(
      z.object({
        value: z.string().optional(),
        label: z.string().min(2).max(10).optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        projectName: z.string().max(20).min(4).optional(),
        projectDescription: z.string().max(200).min(4).optional(),
        repositoryUrl: z.string().optional(),
        demoUrl: z.string().optional(),
      })
    )
    .optional(),
  educationWithExperiences: z
    .array(
      z.object({
        orgName: z.string().optional(),
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
        type: z.enum(["school", "company"]).optional(), //either school or company
        designation: z.string().optional(),
        location: z.string().optional(),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = formDefaultValues;

export default function FormSection({
  formValues,
  updateFormValues,
}: {
  formValues: any;
  updateFormValues: any;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const { watch, getValues } = form;

  // type ThemeColor =
  //   | "purple"
  //   | "amber"
  //   | "lime"
  //   | "indigo"
  //   | "pink"
  //   | string
  //   | undefined;
  // const [theme, setTheme] = useState<ThemeColor>(defaultValues.theme);

  const { fields: socialLinksField, update: updateSocialLinks } = useFieldArray(
    {
      name: "socialLinks",
      control: form.control,
    }
  );

  const {
    fields: skillsField,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    name: "skills",
    control: form.control,
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
    update: updateProject,
  } = useFieldArray({
    name: "projects",
    control: form.control,
  });

  const {
    fields: eduExpFields,
    append: appendEduExp,
    update: updateEduExp,
    remove: removeEduExp,
  } = useFieldArray({
    name: "educationWithExperiences",
    control: form.control,
  });

  // Watch the form fields
  // Watch the form fields
  const shortnameValue = watch("shortname");
  const fullNameValue = watch("fullName");
  const bioValue = watch("bio");
  const phoneValue = watch("phone");
  const emailValue = watch("email");
  const skillsValue = watch("skills");
  const projectsValue = watch("projects");

  const openToWorkValue = watch("isOpenToWork");
  const expValue = watch("experience");
  const completedProjectsValue = watch("completedProjects");

  const eduExpValues = watch("educationWithExperiences");
  const socialLinksValue = watch("socialLinks");

  const themeValue = watch("theme");
  const fontValue = watch("font");
  // Log the value of shortnameValue to the console whenever it changes
  useEffect(() => {
    updateFormValues({
      shortname: shortnameValue,
      fullName: fullNameValue,
      bio: bioValue,
      phone: phoneValue,
      email: emailValue,
      skills: skillsValue,
      projects: projectsValue,
      openToWork: openToWorkValue,
      experience: expValue,
      completedProjects: completedProjectsValue,
      eduExpValues: eduExpValues,
      socialLinks: socialLinksValue,
      theme: themeValue,
      font: fontValue,
    });
  }, [
    shortnameValue,
    fullNameValue,
    bioValue,
    phoneValue,
    emailValue,
    skillsValue,
    projectsValue,
    openToWorkValue,
    expValue,
    completedProjectsValue,
    eduExpValues,
    socialLinksValue,
    themeValue,
    fontValue,
  ]);

  function onSubmit(data: any) {
    console.log("FORM SUBMITTED", data);
    <Toast title="Form submitted successfully" />;
    // Toaster({
    //   title: "You submitted the following values:",
    //   // description: (
    //   //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //   //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //   //   </pre>
    //   // ),
    // });
  }
  const { resolvedTheme: mode } = useTheme();
  return (
    <div className="bg-white p-4 w-[30%] overflow-y-scroll h-screen">
      {/* <div className="hidden bg-purple-500 bg-indigo-500 bg-amber-500 bg-lime-500 bg-pink-500"></div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="appearance">
              <AccordionTrigger>Appearance</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Theme
                      </FormLabel>

                      <FormControl>
                        <div className="flex flex-row mt-2 gap-4">
                          {["purple", "amber", "lime", "indigo", "pink"].map(
                            (color, index) => (
                              <label
                                key={index}
                                className={`flex items-center gap-2 cursor-pointer`}
                              >
                                <input
                                  type="radio"
                                  {...field}
                                  value={color}
                                  checked={field.value === color}
                                  onChange={() => field.onChange(color)}
                                  className="sr-only"
                                />
                                <span
                                  className={`h-6 w-6 rounded-full bg-${color}-500 border-2 border-transparent inline-block`}
                                >
                                  {field.value === color && (
                                    <CheckIcon className="h-5 w-5 text-white items-center flex" />
                                  )}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="font"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Font
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a font" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="font_1">Roboto</SelectItem>
                          <SelectItem value="font_2">Sans</SelectItem>
                          <SelectItem value="font_3">GoogleFont</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="about">
              <AccordionTrigger>About</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="shortname"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Short name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="short name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real
                        name or a pseudonym.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Full name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Experience
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Years of experience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="completedProjects"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                        Projects count
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Completed projects count"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isOpenToWork"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="border-b border-dashed text-gray-500 border-amber-600 ">
                          Show Available badge
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="socialLinks">
              <AccordionTrigger>Social Links</AccordionTrigger>
              <AccordionContent>
                <div>
                  {socialLinksField.map((field, index) => (
                    <div key={field.id}>
                      <FormField
                        control={form.control}
                        name={`socialLinks.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormControl>
                              <span className="flex items-center flex-row gap-2">
                                <p>
                                  {socialLinksSVGs &&
                                    socialLinksSVGs[
                                      // @ts-ignore
                                      socialLinksField[index].label
                                    ]}
                                </p>

                                <Input
                                  {...field}
                                  placeholder={`${socialLinksField[index].label} link`}
                                  name="socialLinks"
                                  onChange={(e) => {
                                    updateSocialLinks(index, {
                                      value: e.target.value,
                                      label: socialLinksField[index].label,
                                    });
                                  }}
                                />
                              </span>
                            </FormControl>
                            {socialLinksField[index].label == "resume" && (
                              <FormDescription>
                                Fill this to get download resume button
                              </FormDescription>
                            )}

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills">
              <AccordionTrigger>Skills</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <MultipleSelector
                      defaultOptions={skillOptions}
                      placeholder="add or create  skills"
                      creatable
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                      value={skillsField}
                      onSelectFunc={appendSkill}
                      onUnselectFunc={removeSkill}
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="educationWithExperiences">
              <AccordionTrigger>Education and experience</AccordionTrigger>
              <AccordionContent>
                <div>
                  {eduExpFields.map((field: any, index: number) => (
                    <div key={field.id}>
                      <FormField
                        control={form.control}
                        name={`educationWithExperiences.${index}.orgName`}
                        render={({ field }) => (
                          <div className="inline-block w-full">
                            <p className="bg-amber-400 mb-1 text-white text-xs  p-2 capitalize rounded-lg flex justify-between items-center gap-2.5">
                              {field.value} (
                              {getValues(
                                `educationWithExperiences.${index}.fromDate`
                              )}
                              -
                              {getValues(
                                `educationWithExperiences.${index}.toDate`
                              )}
                              )
                              <span className="flex items-center justify-end gap-1">
                                <AddEduExpDialog
                                  onAddItem={appendEduExp}
                                  passedValues={getValues(
                                    `educationWithExperiences.${index}`
                                  )}
                                  action="edit"
                                  index={index}
                                  onEditItem={updateEduExp}
                                />
                                <IoClose
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() => removeEduExp(index)}
                                />
                              </span>
                            </p>
                          </div>
                        )}
                      />
                    </div>
                  ))}
                </div>
                {/* DialogDemo component */}
                <AddEduExpDialog onAddItem={appendEduExp} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projects">
              <AccordionTrigger>Projects</AccordionTrigger>
              <AccordionContent>
                <div>
                  {projectFields.map((field: any, index: number) => (
                    <div key={field.id}>
                      <FormField
                        control={form.control}
                        name={`projects.${index}.projectName`}
                        render={({ field }) => (
                          <div className="inline-block w-full">
                            <p className="bg-purple-400 mb-1 text-white text-xs  p-2 capitalize rounded-lg flex justify-between items-center gap-2.5">
                              {/*  */}
                              {field.value}

                              <span className="flex items-center justify-end gap-1">
                                <AddEditProjectDialog
                                  onAddProject={appendProject}
                                  passedValues={getValues(`projects.${index}`)}
                                  action="edit"
                                  index={index}
                                  onEditProject={updateProject}
                                />
                                <IoClose
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() => removeProject(index)}
                                />
                              </span>
                            </p>
                          </div>
                        )}
                      />
                    </div>
                  ))}
                </div>
                {/* DialogDemo component */}
                <AddEditProjectDialog onAddProject={appendProject} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button type="submit" variant={"outline"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

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
