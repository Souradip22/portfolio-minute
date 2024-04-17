import { profileFormSchema } from "@/components/FormSection";
import { z } from "zod";

type ProfileFormValues = z.infer<typeof profileFormSchema>;
export const formDefaultValues: Partial<ProfileFormValues> = {
  shortname: "COOL",
  fullName: "Souradip Chandra",
  bio: "Versatile full-stack engineer proficient in both front-end and back-end development, adept at crafting seamless and intuitive user experiences. 💻🎨",
  experience: "5",
  completedProjects: "10",
  isOpenToWork: true,
  email: "souradip000@gmail.com",
  phone: "+91 7318757426",
  urls: [
    { value: "https://shadcn.com", label: "Leetcode" },
    { value: "http://twitter.com/shadcn", label: "Twitter" },
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
