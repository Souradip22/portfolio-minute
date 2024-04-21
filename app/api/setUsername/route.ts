import { getUser, setUsername } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const body = await req.json();
  const { username } = body;
  const userDEtails = await setUsername(session.user.email as string, username);

  return NextResponse.json(userDEtails);
}
