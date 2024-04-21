import prisma from "@/lib/prisma";
import { UsernameAvailabilityResponse } from "./interfaces";
import { getSession } from "./auth";
import useSWR from "swr";

import { z } from "zod";
import { profileSchema } from "@/schemas/ProfileFormSchema";

type TSProfileSchema = z.infer<typeof profileSchema>;

async function validateUsernameFormat(
  inpUsername: string
): Promise<string | null> {
  if (!inpUsername) {
    return "Username is required";
  }
  if (inpUsername.length < 3) {
    return "Min. 3 characters are required";
  }
  if (!/^[a-z]+$/.test(inpUsername)) {
    return "Username must contain only lowercase letters (a-z)";
  }
  return null;
}

export async function isUsernameTaken(
  inpUsername: string
): Promise<UsernameAvailabilityResponse> {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      message: "Username is not authenticated",
      available: false,
    };
  }
  const validationError = await validateUsernameFormat(inpUsername);
  if (validationError) {
    return {
      message: validationError,
      available: false,
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: inpUsername,
        mode: "insensitive", // Case-insensitive search
      },
    },
  });

  if (user) {
    return {
      message: "Username is not available",
      available: false,
    };
  }

  return {
    message: "Username is available",
    available: true,
  };
}
export async function getProfile(): Promise<TSProfileSchema | null> {
  try {
    const response = await fetch(`/api/profile`);
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    const profileData: TSProfileSchema = await response.json();
    return profileData;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function getUser(): Promise<any | null> {
  try {
    const response = await fetch(`/api/user`);
    if (!response.ok) {
      throw new Error("Failed to fetch User");
    }
    const userData: any = await response.json();
    return userData;
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
export default async function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}
