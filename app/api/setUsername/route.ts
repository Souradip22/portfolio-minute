import { getUser, setUsername } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username } = body;
  const userDEtails = await setUsername(username);

  return NextResponse.json(userDEtails);
}
