import { createProfile, getProfile, updateProfile } from "@/lib/actions";
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
  const userId = session.user.id;
  const profile = await createProfile(
    userId as string,
    body as ProfileFormData
  );

  return NextResponse.json(profile);
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
  const updatedProfileDetails = await updateProfile(body as ProfileFormData);

  return NextResponse.json(updatedProfileDetails);
}
