/** @format */
"use client";

import Image from "next/image";
import { useState } from "react";

// import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NavItem } from "@/lib/types";
import { navItems } from "@/lib/constants";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto text-sm flex items-center justify-between rounded-2xl bg-white p-3 shadow dark:bg-black dark:shadow-dark">
        {/* left side  */}
        <div ref={animationParent} className="flex items-center gap-10">
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

            <span>
              {" "}
              Bento<span className="text-primary">Folio</span>{" "}
            </span>
          </a>
          {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
          <div className="hidden lg:flex items-center gap-4 transition-all">
            {navItems.map((d, i) => (
              <Link
                key={i}
                href={d.link ?? "#"}
                className="relative group text-base font-medium transition-all rounded-lg px-3 py-2  hover:bg-gray-100 dark:hover:bg-zinc-900  dark:text-gray-200 dark:active:bg-zinc-900"
              >
                <p className="flex cursor-pointer items-center gap-2 ">
                  {/* {d.iconImage && <d.iconImage />} */}
                  <span>{d.label}</span>
                  {d.children && (
                    <IoIosArrowDown className=" rotate-180  transition-all group-hover:rotate-0" />
                  )}
                </p>

                {/* group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-center text-base font-medium text-muted transition hover:bg-light hover:text-dark group-[.active]/menu-item:bg-light group-[.active]/menu-item:text-dark dark:hover:bg-dark-2 dark:hover:text-white dark:group-[.active]/menu-item:bg-dark-2 dark:group-[.active]/menu-item:text-white */}

                {/* dropdown */}
                {d.children && (
                  <div className="absolute   right-0   top-10 hidden w-auto  flex-col gap-1   rounded-lg bg-white py-3 shadow-md  transition-all group-hover:flex ">
                    {d.children.map((ch, i) => (
                      <Link
                        key={i}
                        href={ch.link ?? "#"}
                        className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black  "
                      >
                        {/* image */}
                        {ch.iconImage && <ch.iconImage />}
                        {/* item */}
                        <span className="whitespace-nowrap   pl-3 ">
                          {ch.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
          {/* navitems */}
        </div>

        {/* right side data */}
        <div className=" hidden lg:flex   items-center gap-8 ">
          <ThemeSwitch />

          <button className="h-fit rounded-lg border border-neutral-400 px-4 py-2  transition-all hover:border-black hover:text-black/90 dark:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white">
            Let Chat
          </button>
        </div>

        <FiMenu
          onClick={openSideMenu}
          className="cursor-pointer text-3xl lg:hidden dark:text-white"
        />
      </div>
    </header>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  return (
    <div className="fixed right-0 top-0 flex h-full min-h-screen w-full justify-start  bg-gray-900 bg-opacity-50 lg:hidden ">
      <div className=" text-base font-medium transition-all rounded-r-lg  h-full w-[70%] sm:w-[30%] bg-white dark:bg-gray-950 px-4 py-4 shadow-2xl shadow-blue-500/20">
        <section className="flex justify-end dark:text-white">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-2xl "
          />
        </section>
        <div className=" flex flex-col text-base  gap-2 ">
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

        <section className="  flex  flex-col   gap-8  mt-4 items-center">
          <ThemeSwitch />

          <button className="w-full  max-w-[200px]  rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Register
          </button>
        </section>
      </div>
    </div>
  );
}

function SingleNavItem(d: NavItem) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);

  function toggleItem() {
    return setItem(!isItemOpen);
  }

  return (
    <Link
      ref={animationParent}
      onClick={toggleItem}
      href={d.link ?? "#"}
      className="relative rounded  px-2 py-3 transition-all transition-duration-200 hover:bg-gray-100 dark:hover:bg-zinc-900  dark:text-gray-400 dark:hover:text-gray-100 dark:active:bg-zinc-900"
    >
      <p className="flex cursor-pointer items-center gap-2  ">
        <span>{d.label}</span>
        {d.children && (
          // rotate-180
          <IoIosArrowDown
            className={`text-xs transition-all  ${isItemOpen && " rotate-180"}`}
          />
        )}
      </p>

      {/* dropdown */}
      {isItemOpen && d.children && (
        <div className="  w-auto  flex-col gap-1   rounded-lg bg-white py-3   transition-all flex ">
          {d.children.map((ch, i) => (
            <Link
              key={i}
              href={ch.link ?? "#"}
              className=" flex cursor-pointer items-center  py-1 pl-6 pr-8  text-neutral-400 hover:text-black  "
            >
              {/* image */}
              {ch.iconImage && <ch.iconImage />}
              {/* item */}
              <span className="whitespace-nowrap   pl-3 ">{ch.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}
