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

export async function GET(): Promise<void | Response> {
  const session = await getSession();
  if (!session?.user.id) {
    return new Response("Not authenticated", { status: 401 });
  }
  const userId = session.user.id;
  const userProfile = await getProfile(userId as string);
  if (userProfile) {
    return new Response(JSON.stringify(userProfile), { status: 200 });
  } else {
    return new Response("Error fetching profile", { status: 500 });
  }
}

//Create a profile
export async function POST(req: Request): Promise<void | Response> {
  const session = await getSession();
  if (!session?.user.id) {
    return new Response("Not authenticated", { status: 401 });
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
    return new Response(JSON.stringify(profile), { status: 200 });
  } else {
    return new Response("Error creating profile", { status: 500 });
  }
}

//Update a profile
export async function PATCH(req: Request): Promise<void | Response> {
  const session = await getSession();
  if (!session?.user.id) {
    return new Response("Not authenticated", { status: 401 });
  }
  const body = await req.json();
  const userDetails = await getUser(session.user.email as string);
  const subdomain =
    userDetails && "username" in userDetails && userDetails.username;
  const updatedProfileDetails = await updateProfile(
    body as ProfileFormData,
    subdomain as string
  );

  if (updatedProfileDetails) {
    return new Response(JSON.stringify(updatedProfileDetails), { status: 200 });
  } else {
    return new Response("Error updating profile", { status: 500 });
  }
}
