import { profileSchema } from "@/schemas/ProfileFormSchema";
import { z } from "zod";

type TSProfileSchema = z.infer<typeof profileSchema>;
export const profileFormDefaultValues: Partial<TSProfileSchema> = {
  theme: "lime",
  font: "font_1",
  shortname: "S Chandra",
  fullName: "Souradip Chandra",
  bio: "I am a SWE at Grid Dynamics, where I work with Google Wifi team. Before Grid, I used to work with Dassault Systèmes as a Research & Development Engineer.  My passion lies in creating visually captivating interfaces, building robust tools, and refining user interactions to ensure they are both intuitive and delightful.",
  experience: "5",
  completedProjects: "10",
  isOpenToWork: true,
  userEmail: "souradip.chandra97@gmail.com",
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
    {
      label: "Nextjs",
      value: "nextjs",
    },
    {
      label: "React",
      value: "reactjs",
    },
    {
      label: "Typescript",
      value: "typescript",
    },
    {
      label: "Css",
      value: "css",
    },
    {
      label: "Python",
      value: "python",
    },
    {
      label: "Java",
      value: "java",
    },
    {
      label: "Nodejs",
      value: "nodejs",
    },
    {
      label: "Mongodb",
      value: "mongodb",
    },
    {
      label: "Tailwindcss",
      value: "tailwindcss",
    },
    {
      label: "Django",
      value: "django",
    },
    {
      label: "Git",
      value: "git",
    },
    {
      label: "Google Cloud",
      value: "google_cloud",
    },
    {
      label: "Sql",
      value: "sql",
    },
    {
      label: "Kafka",
      value: "kafka",
    },
    {
      label: "Vs Code",
      value: "vs_code",
    },
    {
      label: "Atom",
      value: "atom",
    },
    {
      label: "Mysql",
      value: "mysql",
    },
  ],
  projects: [
    {
      projectName: "shadcn/ui",
      projectDescription:
        "This is just an example/placeholder. I have used many components from here to make this website",
      repositoryUrl: "https://shadcn.com",
      demoUrl: "https://github.com/shadcn-ui/ui",
    },
    {
      projectName: "Vercel",
      projectDescription:
        "This website is hosted on Vercel. That too for free. Can you believe it?",
      repositoryUrl: "https://github.com/vercel/vercel",
      demoUrl: "https://vercel.com",
    },
    {
      projectName: "Tailwind",
      projectDescription:
        "A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
      repositoryUrl: "",
      demoUrl: "https://tailwindcss.com/",
    },
    {
      projectName: "My own portfolio",
      projectDescription:
        "I have a resources section under my own portfolio website, do check that out.",
      repositoryUrl: "",
      demoUrl: "https://souradip.ch",
    },
  ],
  educationWithExperiences: [
    {
      orgName: "Academy of Technology",
      fromDate: "2014",
      toDate: "2018",
      location: "West Bengal, India.",
      designation: "Engineering",
      type: "school", // Corrected type
    },
    {
      orgName: "Dassault Systemes",
      fromDate: "2021",
      toDate: "2023",
      location: "Bangalore, India.",
      designation: "R&D Specialist",
      type: "company", // Corrected type
    },
    {
      orgName: "Wipro Digital",
      fromDate: "2018",
      toDate: "2021",
      location: "Bangalore, India.",
      designation: "Senior Software Developer",
      type: "company", // Corrected type
    },
  ],
};
