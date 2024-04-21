import { isUsernameTaken } from "@/lib/fetchers";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   // Extract the username from the request
//   const { username } = req.body; // Assuming the username is in the request body

//   try {
//     // Call the isUsernameTaken method with the username
//     const expDetails = await isUsernameTaken(username);

//     // Send a response based on the result
//     res.status(200).json(expDetails);
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

export async function POST(req: Request) {
  const body = await req.json();
  const { username } = body;

  const expDetails = await isUsernameTaken(username);

  return NextResponse.json(expDetails);
}
