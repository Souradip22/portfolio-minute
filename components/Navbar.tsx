/** @format */
"use client";

import Image from "next/image";
import { useState } from "react";

// import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { NavItem } from "@/lib/types";
import { navItems } from "@/lib/constants";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";

export default function Navbar({ shortname }: { shortname?: string }) {
  const [isSideMenuOpen, setSideMenu] = useState(false);
  function openSideMenu() {
    setSideMenu(true);
  }

  let first = shortname;
  let second = "";
  if (shortname) {
    [first, second] = shortname.split(" ");
  }

  return (
    <header className="sticky top-0 z-10">
      <div className="mx-auto text-sm flex items-center justify-between rounded-2xl bg-white p-3 shadow dark:bg-black dark:shadow-dark">
        {/* left side  */}
        <div className="flex items-center gap-10 w-5/6">
          {/* logo */}
          <a
            href="index.html"
            className="inline-flex items-center gap-3 px-3 text-2xl font-semibold text-dark dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                fill="currentColor"
                d="M0 1.5A1.5 1.5 0 0 1 1.5 0H9a1.5 1.5 0 0 1 1.5 1.5v21A1.5 1.5 0 0 1 9 24H1.5A1.5 1.5 0 0 1 0 22.5v-21Zm13.5 0A1.5 1.5 0 0 1 15 0h7.5A1.5 1.5 0 0 1 24 1.5V9a1.5 1.5 0 0 1-1.5 1.5H15A1.5 1.5 0 0 1 13.5 9V1.5Zm0 13.5a1.5 1.5 0 0 1 1.5-1.5h7.5A1.5 1.5 0 0 1 24 15v7.5a1.5 1.5 0 0 1-1.5 1.5H15a1.5 1.5 0 0 1-1.5-1.5V15Z"
              ></path>
            </svg>
            {first && (
              <span>
                {" "}
                {first}
                {second && <span className="text-indigo-600">{second}</span>}
              </span>
            )}{" "}
          </a>

          <div className="hidden lg:flex items-center gap-4 transition-all mx-auto">
            {navItems.map((d, i) => (
              <Link
                key={i}
                href={d.link ?? "#"}
                className="flex items-center gap-4 text-gray-500 dark:text-gray-400 rounded-md bg-gray-50 hover:text-gray-800 hover:bg-gray-100 dark:bg-stone-900 hover:dark:bg-stone-800 hover:dark:text-gray-200 px-3 py-2 active:dark:text-gray-200 cursor-pointer font-bold"
              >
                {d.iconImage && <d.iconImage className="w-5 h-5" />}
                {d.label}
              </Link>
            ))}
          </div>
        </div>

        {/* right side data */}
        <div className=" hidden lg:flex   items-center gap-4 ">
          <ThemeSwitch />

          <button className="rounded-md border border-neutral-400 px-4 py-2  transition-all hover:border-black hover:text-black/90 dark:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white">
            Let Chat
          </button>
        </div>

        <FiMenu
          onClick={openSideMenu}
          className="cursor-pointer text-3xl lg:hidden dark:text-white"
        />
      </div>
      <MobileNav isSideMenuOpen={isSideMenuOpen} setSideMenu={setSideMenu} />
    </header>
  );
}

function MobileNav({
  isSideMenuOpen,
  setSideMenu,
}: {
  isSideMenuOpen: any;
  setSideMenu: any;
}) {
  const router = useRouter();
  const className =
    "bg-black w-full max-w-[300px] lg:hidden transition-[margin-right] ease-in-out duration-500 fixed  top-0 bottom-0 right-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = isSideMenuOpen ? " mr-0" : " mr-[-300px] md:ml-0";

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

    // console.log(router, route);
    return (
      <Link
        href={route}
        onClick={() => {
          setSideMenu((oldVal: any) => !oldVal);
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
      className={`flex lg:hidden fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30`}
      onClick={() => {
        setSideMenu((oldVal: any) => !oldVal);
      }}
    />
  );
  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="w-full max-w-[300px] text-base font-medium transition-all  ease-linear h-full duration-500 bg-white dark:bg-gray-950 px-6 py-10 shadow-2xl shadow-blue-500/20 flex flex-col justify-between ">
          <div>
            <div className="flex justify-end dark:text-white">
              <AiOutlineClose
                onClick={() => {
                  setSideMenu((oldVal: any) => !oldVal);
                }}
                className="cursor-pointer text-2xl "
              />
            </div>
            <div className=" flex flex-col text-base gap-2 mt-10">
              {navItems.map((d, i) => (
                <SingleNavItem
                  key={i}
                  label={d.label}
                  iconImage={d.iconImage}
                  link={d.link}
                >
                  {d.children}
                </SingleNavItem>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col  gap-8  mt-4 items-center">
              <ThemeSwitch text="Change appearance" />

              <button className="w-full  max-w-[300px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      {isSideMenuOpen ? <ModalOverlay /> : <></>}
    </>
  );
}

function SingleNavItem(d: NavItem) {
  return (
    <span className="flex items-center gap-4 rounded-md bg-gray-50 hover:bg-gray-100 dark:bg-stone-900 hover:dark:bg-stone-800 dark:text-gray-300 px-4 py-3  cursor-pointer">
      {d.iconImage && <d.iconImage className="w-4 h-4" />}
      {d.label}
    </span>
  );
}
