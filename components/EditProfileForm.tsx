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

import { profileFormDefaultValues } from "@/lib/defaultValues";
import { skillNames, themes } from "@/lib/constants";

import { socialLinksSVGs } from "./social-links";
import { CheckIcon } from "@radix-ui/react-icons";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { AddEditProjectDialog } from "./AddEditProjectDialog";
import { AddEduExpDialog } from "./AddEditExpDialog";
import SubdomainInfo from "./SubdomainInfo";
import { SignOutButton } from "./AuthButtons";
import { errorToast, successToast } from "@/lib/customToasts";
import { MdClose, MdEdit } from "react-icons/md";
import CustomButton from "./CustomButton";
import { SquareArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";

const filenames = skillNames;

const skillOptions: Option[] = filenames.map((filename) => ({
  label: filename
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  value: filename,
}));

type TSProfileSchema = z.infer<typeof profileSchema>;

const defaultValues: Partial<TSProfileSchema> = profileFormDefaultValues;

export default function EditProfileForm({
  profileDetails,
  username,
  updateProfileDetails,
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
  const userEmailValue = watch("userEmail");
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

  const profilePresent = form.getValues("id");

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const updatedProfileDetails = {
      shortname: shortnameValue,
      fullName: fullNameValue,
      bio: bioValue,
      phone: phoneValue,
      userEmail: userEmailValue,
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
    updateProfileDetails(updatedProfileDetails);
  }, [
    shortnameValue,
    fullNameValue,
    bioValue,
    phoneValue,
    userEmailValue,
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
    setLoading(true);
    if (data.id) {
      try {
        const response = await fetch("/api/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const updatedProfileDetails: any = await response.json();
        setLoading(false);
        if (updatedProfileDetails && updatedProfileDetails.error) {
          setTimeout(() => {
            errorToast({
              title: "❌  Profile update failed",
              description: "Please sign in again to proceed",
            });
          }, 2000);
          signOut();
        }
        successToast({
          title: "✅  Profile updated successfully",
        });
      } catch (error) {
        errorToast({
          title: "❌  failed to update profile",
          description: error,
        });

        console.error("Error creating profile:", error);
      }
    } else {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const createProfileResponse: any = await response.json();
        setLoading(false);
        if (createProfileResponse && createProfileResponse.error) {
          setTimeout(() => {
            errorToast({
              title: "❌  Profile creation failed",
              description: "Please sign in again to proceed",
            });
          }, 2000);
          signOut();
          // throw new Error("Failed to create profile");
        }

        if (createProfileResponse && createProfileResponse.createdProfile) {
          setValue("id", createProfileResponse.createdProfile.id);
          successToast({
            title: "✅  Profile created successfully",
          });
        } else {
          errorToast({
            title: "❌  Profile creation failed",
          });
        }
      } catch (error) {
        setLoading(false);
        errorToast({
          title: "❌  Profile creation failed",
          description: error,
        });
        // Handle errors during insertion
        console.error("Error creating profile:", error);
      }
    }
  }

  return (
    <div className="bg-stone-900 p-10 w-full overflow-y-auto h-screen pb-[300px] ">
      <div className="flex justify-between items-center">
        <a href="/" className="text-xs flex items-center gap-2 text-cyan-500">
          <SquareArrowLeft size={18} /> Go back
        </a>
        <SignOutButton />
      </div>

      {username && (
        <SubdomainInfo text={username} profilePresent={profilePresent} />
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-5 mx-1"
        >
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
                      <FormLabel className="border-b border-dashed text-gray-400 border-amber-600 mx-auto ">
                        Theme
                      </FormLabel>

                      <FormControl>
                        <div className="flex flex-wrap mt-2 gap-4">
                          {themes.map((color, index) => (
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
                          ))}
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
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
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
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
                        Short name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="short name" {...field} />
                      </FormControl>
                      <FormDescription>
                        <span className="text-red-500">*</span>Shortname will
                        appear in the navbar as logo.
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
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
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
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        <span className="text-red-500">*</span>Double space for
                        new line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
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
                  name="userEmail"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
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
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
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
                      <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-neutral-900">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="border-b border-dashed text-neutral-400 border-amber-600 ">
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
                                <p className="h-6 w-6 mx-auto text-cyan-500  flex items-center mr-2">
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
                                <span className="text-red-500">*</span>Please
                                provide a Google Drive link for your resume to
                                enable the {"View Resume"} button in the UI.
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
                          <span className="w-full flex items-center gap-2 mb-[4px] group  border border-solid border-[#eee2] p-1.5 rounded-md justify-between">
                            <div className="flex gap-1 items-center">
                              <div className="text-white ml-1 text-sm opacity-50 group-hover:opacity-100 transition-opacity duration-100 block">
                                {field.value}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-teal-300 px-2.5 py-0.5 rounded-full text-sm">
                              <AddEduExpDialog
                                onAddItem={appendEduExp}
                                passedValues={getValues(
                                  `educationWithExperiences.${index}`
                                )}
                                action="edit"
                                index={index}
                                onEditItem={updateEduExp}
                              />
                              <MdClose
                                className="w-4 h-4 cursor-pointer"
                                onClick={() => removeEduExp(index)}
                              />
                            </div>
                          </span>
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
                          <span className="w-full flex items-center gap-2 mb-[4px] group  border border-solid border-[#eee2] p-1.5 rounded-md justify-between">
                            <div className="flex gap-1 items-center">
                              <div className="text-white ml-1 text-sm opacity-50 group-hover:opacity-100 transition-opacity duration-100 block">
                                {field.value}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-lime-300 px-2.5 py-0.5 rounded-full text-sm">
                              <AddEditProjectDialog
                                onAddProject={appendProject}
                                passedValues={getValues(`projects.${index}`)}
                                action="edit"
                                index={index}
                                onEditProject={updateProject}
                              />
                              <MdClose
                                className="w-4 h-4 cursor-pointer"
                                onClick={() => removeProject(index)}
                              />
                            </div>
                          </span>
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

          <div className="flex justify-end">
            {profilePresent ? (
              <CustomButton title={"Update"} isLoading={isLoading} />
            ) : (
              <CustomButton title={"Create Profile"} isLoading={isLoading} />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
