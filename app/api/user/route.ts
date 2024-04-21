import { getUser } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const userDEtails = await getUser(session.user.email as string);

  return NextResponse.json(userDEtails);
}
