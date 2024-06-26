// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SlHome } from "react-icons/sl";
import { BsInfoSquare, BsEnvelopeAt } from "react-icons/bs";
import { FaTshirt, FaRedhat } from "react-icons/fa";

// import logo from "@/img/logo.svg";

export default function Sidebar({
  show,
  setter,
  children,
}: {
  show: any;
  setter: any;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const className =
    "bg-black w-full max-w-[400px] sm:max-w-full transition-[margin-left] ease-in-out duration-500 fixed sm:static top-0 bottom-0 left-0 z-50";

  const appendClass = show ? " ml-0" : " ml-[-400px] sm:ml-0";

  const ModalOverlay = () => (
    <div
      className={`flex sm:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: any) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>{children}</div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
