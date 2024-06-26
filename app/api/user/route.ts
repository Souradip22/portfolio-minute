import { getUser } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(): Promise<void | Response> {
  const session = await getSession();
  if (!session?.user.id) {
    return new Response("Not authenticated", { status: 401 });
  }
  const userDetails = await getUser(session.user.email as string);
  if (userDetails) {
    return new Response(JSON.stringify(userDetails), { status: 200 });
  } else {
    return new Response("Error fetching user details", { status: 500 });
  }
}
