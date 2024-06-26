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

  // Define our base class
  const className =
    "bg-black w-full max-w-[400px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-400px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({
    icon,
    name,
    route,
  }: {
    icon: any;
    name: any;
    route: any;
  }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      router === route ? "text-white" : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: any) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
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
