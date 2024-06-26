"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn, signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", {
      callbackUrl: `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/dashboard`,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="relative z-10 w-full max-w-[250px] flex justify-center rounded-lg bg-[#3887FD] text-white bg-opacity-50 hover:bg-opacity-60 transition py-3 px-6 ring-1 items-center space-x-2"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
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
      className="flex px-3 py-2 text-xs rounded-md justify-center items-center text-gray-200 bg-transparent border border-[#eee2] border-b border-b-cyan-400 hover:text-gray-50 hover:border-b-cyan-500 gap-2 my-2"
    >
      <FaSignOutAlt />
      <span>Sign out</span>
    </button>
  );
}
