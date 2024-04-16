"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";

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

const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];

const profileFormSchema = z.object({
  shortname: z
    .string()
    .min(2, {
      message: "Short name must be at least 2 characters.",
    })
    .max(10, {
      message: "Short name must not be longer than 10 characters.",
    }),
  fullname: z
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
      message: "Username must not be longer than 10 characters.",
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
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
        label: z.string().min(2).max(10),
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  shortname: "Souradip",
  fullname: "Souradip Chandra",
  bio: "I own a computer.",
  email: "souradip000@gmail.com",
  phone: "+91 7318757426",
  urls: [
    { value: "https://shadcn.com", label: "Leetcode" },
    { value: "http://twitter.com/shadcn", label: "Twitter" },
  ],
  skills: [
    { label: "nextjs", value: "Nextjs" },
    { label: "React", value: "react" },
  ],
  projects: [
    {
      projectName: "Project 1",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, exercitationem.",
      repositoryUrl: "https://shadcn.com",
      demoUrl: "http://twitter.com/shadcn",
    },
    {
      projectName: "Project 2",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, exercitationem.",
      repositoryUrl: "https://shadcn.com",
      demoUrl: "http://twitter.com/shadcn",
    },
  ],
};

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
  const { watch } = form;
  const {
    fields: urlsField,
    append: appendUrl,
    remove: removeUrl,
  } = useFieldArray({
    name: "urls",
    control: form.control,
  });

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
  } = useFieldArray({
    name: "projects",
    control: form.control,
  });

  // Watch the form fields
  // Watch the form fields
  const shortnameValue = watch("shortname");
  const fullnameValue = watch("fullname");
  const bioValue = watch("bio");
  const phoneValue = watch("phone");
  const emailValue = watch("email");
  const skillsValue = watch("skills");
  const projectsValue = watch("projects");

  // Log the value of shortnameValue to the console whenever it changes
  useEffect(() => {
    updateFormValues({
      shortname: shortnameValue,
      fullname: fullnameValue,
      bio: bioValue,
      phone: phoneValue,
      email: emailValue,
      skills: skillsValue,
      projects: projectsValue,
    });
  }, [
    shortnameValue,
    fullnameValue,
    bioValue,
    phoneValue,
    emailValue,
    skillsValue,
    projectsValue,
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

  return (
    <div className="bg-white p-4 w-[30%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="shortname">
              <AccordionTrigger>About</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="shortname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short name</FormLabel>
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
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
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
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
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
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
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
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      defaultOptions={OPTIONS}
                      placeholder="add your skills"
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
            <AccordionItem value="additonalLinks">
              <AccordionTrigger>Additional Links</AccordionTrigger>
              <AccordionContent>
                <div>
                  {urlsField.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`urls.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            URLs
                          </FormLabel>
                          <FormDescription
                            className={cn(index !== 0 && "sr-only")}
                          >
                            Add links to your website, blog, or social media
                            profiles.
                          </FormDescription>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => appendUrl({ value: "", label: "" })}
                  >
                    Add URL
                  </Button>
                </div>
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
                            <p className="bg-purple-400 mb-1 text-white text-sm   py-3 px-5 uppercase rounded flex justify-between items-center gap-2.5">
                              {/*  */}
                              {field.value}
                              <span>
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
                <DialogDemo onAddProject={appendProject} />
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

export function DialogDemo({ onAddProject }: { onAddProject: any }) {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues: any = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    onAddProject(formValues);
    setOpen(false);
    e.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Project</Button>
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
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Textarea
                id="projectDescription"
                name="projectDescription"
                placeholder="Project Description"
                className="col-span-3 resize-zone"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="repositoryUrl"
                name="repositoryUrl"
                placeholder="Repository URL"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Input
                id="demoUrl"
                name="demoUrl"
                placeholder="Demo URL"
                className="col-span-3"
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
