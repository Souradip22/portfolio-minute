import { profileSchema } from "@/schemas/ProfileFormSchema";
import { z } from "zod";

type TSProfileSchema = z.infer<typeof profileSchema>;
export const profileFormDefaultValues: Partial<TSProfileSchema> = {
  theme: "purple",
  font: "font_1",
  shortname: "COOL",
  fullName: "Souradip Chandra",
  bio: "Versatile full-stack engineer proficient in both front-end and back-end development, adept at crafting seamless and intuitive user experiences. 💻🎨",
  experience: "5",
  completedProjects: "10",
  isOpenToWork: true,
  userEmail: "souradip000@gmail.com",
  phone: "+91 7318757426",
  socialLinks: [
    { value: "https://github.com/Souradip22", label: "github" },
    { value: "https://leetcode.com/SOURADIP22/", label: "leetcode" },
    { value: "https://resume.souradip.ch", label: "resume" },
    { value: "https://www.souradip.ch/blogs", label: "blog" },
    { value: "", label: "twitter" },
    {
      value: "https://www.linkedin.com/in/souradip-c-563962141/",
      label: "linkedin",
    },
    { value: "", label: "youtube" },
    { value: "", label: "behance" },
    { value: "", label: "instagram" },
    { value: "", label: "figma" },
  ],
  skills: [
    { label: "Nextjs", value: "nextjs" },
    { label: "React", value: "reactjs" },
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
  educationWithExperiences: [
    {
      orgName: "Bankura Zilla School",
      fromDate: "2014",
      toDate: "2012",
      location: "West Bengal, India.",
      designation: "Higher Secondary School",
      type: "school", // Corrected type
    },
    {
      orgName: "Wipro",
      fromDate: "2018",
      toDate: "2021",
      location: "Bangalore, India.",
      designation: "Senior Software Developer",
      type: "company", // Corrected type
    },
  ],
};
