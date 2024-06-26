"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn, signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { LogOut } from "lucide-react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/dashboard`,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center text-neutral-50 rounded bg-transparent border border-neutral-600 h-10 px-4 py-2 font-semibold"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Sign In</span>
    </button>
  );
}

export function SignOutButton() {
  const handleClick = () => {
    signOut();
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center text-neutral-200 rounded bg-transparent border border-neutral-600 h-10 px-4 py-2 font-semibold "
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span>Sign out</span>
    </button>
  );
}
