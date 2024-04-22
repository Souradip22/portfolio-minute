import {
  createProfile,
  getProfile,
  getUser,
  updateProfile,
} from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { ProfileFormData } from "@/lib/interfaces";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { JsonObject } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { z } from "zod";

type TSProfileSchema = z.infer<typeof profileSchema>;

export async function GET() {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const userId = session.user.id;
  const userProfile = await getProfile(userId as string);
  return NextResponse.json(userProfile);
}

//Create a profile
export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const body = await req.json();
  const userDetails = await getUser(session.user.email as string);
  if (userDetails && "id" in userDetails && "username" in userDetails) {
    // userDetails is of type User
    const profile = await createProfile(
      userDetails.id,
      body as ProfileFormData,
      userDetails.username as string
    );
    return NextResponse.json(profile);
  } else {
    return NextResponse.json({ error: "Failed to create profile" });
  }
}

//Update a profile
export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const body = await req.json();
  const userDetails = await getUser(session.user.email as string);
  const subdomain =
    userDetails && "username" in userDetails && userDetails.username;
  const updatedProfileDetails = await updateProfile(
    body as ProfileFormData,
    subdomain as string
  );

  return NextResponse.json(updatedProfileDetails);
}
