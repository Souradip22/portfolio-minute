import { themes } from "@/lib/constants";
import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().optional(),
  font: z.enum(["font_1", "font_2", "font_3"]).optional(),
  //@ts-ignore
  theme: z.enum(themes).optional(),
  shortname: z
    .string()
    .min(2, {
      message: "Short name must be at least 2 characters.",
    })
    .max(15, {
      message: "Short name must not be longer than 10 characters.",
    })
    .optional(),
  fullName: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters.",
    })
    .max(30, {
      message: "Full name must not be longer than 30 characters.",
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
  userEmail: z.string().optional(),

  phone: z
    .string()
    .min(0, {
      message: "phone must be at least 2 characters.",
    })
    .max(14, {
      message: "Phone must not be longer than 14 characters.",
    })
    .optional(),
  skills: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  socialLinks: z
    .array(
      z.object({
        value: z.string().optional(),
        label: z.string().optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        projectName: z.string().optional(),
        projectDescription: z.string().optional(),
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
