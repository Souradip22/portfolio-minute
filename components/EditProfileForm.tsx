"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { IoClose } from "react-icons/io5";
import { profileFormDefaultValues } from "@/lib/defaultValues";
import { skillNames } from "@/lib/constants";

import { socialLinksSVGs } from "./social-links";
import { CheckIcon } from "@radix-ui/react-icons";

import { toast } from "./ui/use-toast";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { AddEditProjectDialog } from "./AddEditProjectDialog";
import { AddEduExpDialog } from "./AddEditExpDialog";
import { getProfile } from "@/lib/fetchers";

const filenames = skillNames;

const skillOptions: Option[] = filenames.map((filename) => ({
  label: filename
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "), // Capitalize each word in the label
  value: filename, // Use the filename as the value
}));

//extract the TypeScript type that corresponds to the schema
type TSProfileSchema = z.infer<typeof profileSchema>;

// This can come from your database or API.
const defaultValues: Partial<TSProfileSchema> = profileFormDefaultValues;

export default function FormSection({
  profileDetails,
  username,
  updateProfileDetails, // Add this prop
}: {
  profileDetails: any;
  username?: string;
  updateProfileDetails: any;
}) {
  const form = useForm<TSProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileDetails || defaultValues,
    mode: "onChange",
  });
  const { watch, getValues, setValue, formState } = form;

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

  const id = watch("id");
  useEffect(() => {
    if (formState.isDirty) {
      const updatedProfileDetails = {
        shortname: shortnameValue,
        fullName: fullNameValue,
        bio: bioValue,
        phone: phoneValue,
        email: emailValue,
        skills: skillsValue,
        projects: projectsValue,
        isOpenToWork: openToWorkValue,
        experience: expValue,
        completedProjects: completedProjectsValue,
        educationWithExperiences: eduExpValues,
        socialLinks: socialLinksValue,
        theme: themeValue,
        font: fontValue,
        id: id,
      };

      // Call updateProfileDetails function with updated profile details
      updateProfileDetails(updatedProfileDetails);
      console.log("update Profile details called");
    }
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

  async function onSubmit(data: TSProfileSchema) {
    if (data.id) {
      console.log("Updated Form", data);
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      const updatedProfileDetails: TSProfileSchema = await response.json();
      console.log("UPDATED PROFILE==>", updatedProfileDetails);
      toast({
        description: "UPDATE Profile",
      });
    } else {
      try {
        // Make your second request to insert the username into the database
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create profile");
        }
        const createProfileResponse: TSProfileSchema = await response.json();
        setValue("id", createProfileResponse.id);
        toast({
          description: "Create Profile submitted",
        });
      } catch (error) {
        // Handle errors during insertion
        console.error("Error creating profile:", error);
      }
    }
  }

  return (
    <div className="bg-white p-4 w-[30%] overflow-y-scroll h-screen">
      {username && (
        <div className="bg-indigo-500 w-full flex justify-center rounded shadow hover:translate-y-1 transition ease-in duration-150">
          <h2 className=" font-bold text-gray-100 p-4">
            {username}.portfolio.me
          </h2>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="appearance">
              <AccordionTrigger>Appearance</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="mb-4" style={{ display: "none" }}>
                      <FormControl>
                        {/* Use a hidden input field to store the value */}
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
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
          <button
            type="submit"
            className="bg-lime-600 px-4 py-3 font-semibold text-gray-100 rounded"
          >
            Publish
          </button>
        </form>
      </Form>
    </div>
  );
}
