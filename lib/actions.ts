"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth";

import { customAlphabet } from "nanoid";
import { error } from "console";
import { ProfileFormData } from "./interfaces";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { z } from "zod";

type TSProfileSchema = z.infer<typeof profileSchema>;
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string

// export const createSite = async (formData: FormData) => {
//   const session = await getSession();
//   if (!session?.user.id) {
//     return {
//       error: "Not authenticated",
//     };
//   }
//   const name = formData.get("name") as string;
//   const description = formData.get("description") as string;
//   const subdomain = formData.get("subdomain") as string;

//   try {
//     const response = await prisma.site.create({
//       data: {
//         name,
//         description,
//         subdomain,
//         user: {
//           connect: {
//             id: session.user.id,
//           },
//         },
//       },
//     });
//     await revalidateTag(
//       `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
//     );
//     return response;
//   } catch (error: any) {
//     if (error.code === "P2002") {
//       return {
//         error: `This subdomain is already taken`,
//       };
//     } else {
//       return {
//         error: error.message,
//       };
//     }
//   }
// };

// export const addUserName = async (formData: FormData) => {
//   const session = await getSession();
//   if (!session?.user.id) {
//     return {
//       error: "Not authenticated",
//     };
//   }
//   const name = formData.get("name") as string;
//   const description = formData.get("description") as string;
//   const subdomain = formData.get("subdomain") as string;

//   try {
//     const response = await prisma.user.create({
//       data: {
//         name,
//         subdomain,
//         user: {
//           connect: {
//             id: session.user.id,
//           },
//         },
//       },
//     });
//     await revalidateTag(
//       `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
//     );
//     return response;
//   } catch (error: any) {
//     if (error.code === "P2002") {
//       return {
//         error: `This subdomain is already taken`,
//       };
//     } else {
//       return {
//         error: error.message,
//       };
//     }
//   }
// };

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

export async function getUser(inpEmail: string) {
  try {
    const response = await prisma.user.findUnique({
      where: {
        email: inpEmail,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.dir(response, { depth: null });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export async function setUsername(inpUserEmail: string, inpUsername: string) {
  const user = await prisma.user.update({
    where: {
      email: inpUserEmail,
    },
    data: {
      username: inpUsername,
    },
  });

  if (user) {
    return {
      message: "Username updated",
    };
  }

  return {
    message: "Username is unable to update",
  };
}

export async function getProfile(
  inpUserId: string
): Promise<TSProfileSchema | { error: string } | null> {
  try {
    const response = await prisma.profile.findUnique({
      where: {
        userId: inpUserId,
      },
      include: {
        skills: true,
        socialLinks: true,
        projects: true,
        educationWithExperiences: true,
      },
    });

    return response as TSProfileSchema;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export async function createProfile(
  userId: string,
  formData: ProfileFormData
): Promise<TSProfileSchema | { error: string } | null> {
  try {
    // Create the profile
    const createdProfile = await prisma.profile.create({
      data: {
        font: formData.font,
        theme: formData.theme,
        shortname: formData.shortname,
        fullName: formData.fullName,
        bio: formData.bio,
        experience: formData.experience,
        completedProjects: formData.completedProjects,
        isOpenToWork: formData.isOpenToWork,
        email: formData.email,
        phone: formData.phone,
        skills: {
          createMany: {
            data: formData.skills,
          },
        },
        socialLinks: {
          createMany: {
            data: formData.socialLinks,
          },
        },
        projects: {
          createMany: {
            data: formData.projects,
          },
        },
        educationWithExperiences: {
          createMany: {
            data: formData.educationWithExperiences,
          },
        },
        // Associate the profile with the specified user
        user: {
          connect: { id: userId },
        },
      },
    });
    return createdProfile as TSProfileSchema;
  } catch (error: any) {
    return {
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateProfile(
  formData: ProfileFormData
): Promise<{ updatedProfile: TSProfileSchema | null; error: string | null }> {
  let updatedProfile: TSProfileSchema | null = null;
  const error: string | null = null;

  try {
    // Start a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Delete all existing data associated with the profile ID
      await tx.skill.deleteMany({
        where: {
          profileId: formData.id,
        },
      });

      await tx.socialLink.deleteMany({
        where: {
          profileId: formData.id,
        },
      });

      await tx.project.deleteMany({
        where: {
          profileId: formData.id,
        },
      });

      await tx.educationWithExperience.deleteMany({
        where: {
          profileId: formData.id,
        },
      });

      // Create new data for the profile
      // @ts-ignore
      updatedProfile = await tx.profile.update({
        where: {
          id: formData.id,
        },
        data: {
          font: formData.font,
          theme: formData.theme,
          shortname: formData.shortname,
          fullName: formData.fullName,
          bio: formData.bio,
          experience: formData.experience,
          completedProjects: formData.completedProjects,
          isOpenToWork: formData.isOpenToWork,
          email: formData.email,
          phone: formData.phone,
          skills: {
            createMany: {
              data: formData.skills.map((skill) => ({
                label: skill.label,
                value: skill.value,
              })),
            },
          },
          socialLinks: {
            createMany: {
              data: formData.socialLinks.map((link) => ({
                label: link.label,
                value: link.value,
              })),
            },
          },
          projects: {
            createMany: {
              data: formData.projects.map((project) => ({
                projectName: project.projectName,
                projectDescription: project.projectDescription,
                repositoryUrl: project.repositoryUrl,
                demoUrl: project.demoUrl,
              })),
            },
          },
          educationWithExperiences: {
            createMany: {
              data: formData.educationWithExperiences.map((eduExp) => ({
                orgName: eduExp.orgName,
                fromDate: eduExp.fromDate,
                toDate: eduExp.toDate,
                type: eduExp.type,
                designation: eduExp.designation,
                location: eduExp.location,
              })),
            },
          },
        },
        include: {
          skills: true,
          socialLinks: true,
          projects: true,
          educationWithExperiences: true,
        },
      });
    });
  } catch (error: any) {
    error = error.message;
  } finally {
    await prisma.$disconnect();
  }

  return { updatedProfile, error };
}
