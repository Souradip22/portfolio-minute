const { PrismaClient } = require("@prisma/client");

const prismaC = new PrismaClient();

const userData = {
  font: "font_1",
  theme: "purple",
  shortname: "COOL",
  fullName: "Souradip Chandra",
  bio: "Versatile full-stack engineer proficient in both front-end and back-end development, adept at crafting seamless and intuitive user experiences. 💻🎨",
  experience: "5",
  completedProjects: "10",
  isOpenToWork: true,
  email: "souradip000@gmail.com",
  phone: "+91 7318757426",
  skills: [
    { label: "Nextjs", value: "nextjs" },
    { label: "React", value: "reactjs" },
  ],
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
      type: "school",
      designation: "Higher Secondary School",
      location: "West Bengal, India.",
    },
    {
      orgName: "Wipro",
      fromDate: "2018",
      toDate: "2021",
      type: "company",
      designation: "Senior Software Developer",
      location: "Bangalore, India.",
    },
  ],
};

// async function main() {
//   try {
//     const user = await prismaC.user.create({
//       data: {
//         font: userData.font,
//         theme: userData.theme,
//         shortname: userData.shortname,
//         fullName: userData.fullName,
//         bio: userData.bio,
//         experience: userData.experience,
//         completedProjects: userData.completedProjects,
//         isOpenToWork: userData.isOpenToWork,
//         email: userData.email,
//         phone: userData.phone,
//         skills: {
//           createMany: {
//             data: userData.skills.map((skill) => ({
//               label: skill.label,
//               value: skill.value,
//             })),
//           },
//         },
//         socialLinks: {
//           createMany: {
//             data: userData.socialLinks.map((link) => ({
//               value: link.value,
//               label: link.label,
//             })),
//           },
//         },
//         projects: {
//           createMany: {
//             data: userData.projects.map((project) => ({
//               projectName: project.projectName,
//               projectDescription: project.projectDescription,
//               repositoryUrl: project.repositoryUrl,
//               demoUrl: project.demoUrl,
//             })),
//           },
//         },
//         educationWithExperiences: {
//           createMany: {
//             data: userData.educationWithExperiences.map((eduExp) => ({
//               orgName: eduExp.orgName,
//               fromDate: eduExp.fromDate,
//               toDate: eduExp.toDate,
//               type: eduExp.type,
//               designation: eduExp.designation,
//               location: eduExp.location,
//             })),
//           },
//         },
//       },
//     });
//     console.log("User created:", user);
//   } catch (error) {
//     console.error("Error creating user:", error);
//   }
// }

// main()
//   .then(async () => {
//     await prismaC.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prismaC.$disconnect();
//     process.exit(1);
//   });

// async function callFetch() {
//   const usersWithPosts = await prismaC.user.findUnique({
//     where: {
//       email: "alice@prisma.io",
//     },
//     include: {
//       skills: true,
//       socialLinks: true,
//       projects: true,
//       educationWithExperiences: true,
//     },
//   });
//   console.dir(usersWithPosts, { depth: null });
// }

// callFetch()
//   .then(async () => {
//     await prismaC.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prismaC.$disconnect();
//     process.exit(1);
//   });

async function callFetch() {
  const usersWithPosts = await prismaC.user.findUnique({
    where: {
      email: "alice@prisma.io",
    },
    include: {
      skills: true,
      socialLinks: true,
      projects: true,
      educationWithExperiences: true,
    },
  });
  console.dir(usersWithPosts, { depth: null });
}

callFetch()
  .then(async () => {
    await prismaC.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaC.$disconnect();
    process.exit(1);
  });
