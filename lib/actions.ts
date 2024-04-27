"use server";

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth";

import { customAlphabet } from "nanoid";
import { error } from "console";
import { ProfileFormData } from "./interfaces";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { z } from "zod";
import { subscribe } from "diagnostics_channel";

type TSProfileSchema = z.infer<typeof profileSchema>;
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

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

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}

export async function setUsername(inpUsername: string) {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  try {
    const userUpdate = await prisma.user.update({
      where: {
        email: session?.user.email,
      },
      data: {
        username: inpUsername,
      },
    });
    return userUpdate;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This username is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
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
  formData: ProfileFormData,
  subdomain: string
): Promise<{ createdProfile: TSProfileSchema | null; error: string | null }> {
  let createdProfile: TSProfileSchema | null = null;
  const error: string | null = null;

  try {
    // Create the profile
    await prisma.$transaction(async (tx) => {
      //@ts-ignore
      createdProfile = await tx.profile.create({
        data: {
          font: formData.font,
          theme: formData.theme,
          shortname: formData.shortname,
          fullName: formData.fullName,
          bio: formData.bio,
          experience: formData.experience,
          completedProjects: formData.completedProjects,
          isOpenToWork: formData.isOpenToWork,
          userEmail: formData.userEmail,
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
      const siteDetails = await tx.site.create({
        data: {
          description: "Site for " + formData.fullName,
          subdomain: subdomain,
          profile: {
            connect: { id: createdProfile?.id },
          },
          user: {
            connect: { id: userId },
          },
        },
      });
    });
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-profile`
    );
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        createdProfile,
        error: `This subdomain is already taken`,
      };
    } else {
      return {
        createdProfile,
        error: error.message,
      };
    }
  } finally {
    await prisma.$disconnect();
  }
  return { createdProfile, error };
}

export async function updateProfile(
  formData: ProfileFormData,
  subdomain?: string
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
          userEmail: formData.userEmail,
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

    if (subdomain) {
      await revalidateTag(
        `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-profile`
      );
      await revalidateTag(
        `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
      );
    }
  } catch (error: any) {
    error = error.message;
  } finally {
    await prisma.$disconnect();
  }

  return { updatedProfile, error };
}
