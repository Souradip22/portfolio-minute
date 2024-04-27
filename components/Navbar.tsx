/** @format */
"use client";

import Image from "next/image";
import { useState } from "react";

// import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

import { FiMenu, FiPhone, FiPhoneCall } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { NavItem, SingleThemeProps, ThemeOptions } from "@/lib/types";
import { navItems } from "@/lib/constants";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";
import logo from "@/public/logo/logo-no-background.svg";

export default function Navbar({
  shortname,
  themeProps,
}: {
  shortname?: string;
  themeProps?: SingleThemeProps;
}) {
  const [isSideMenuOpen, setSideMenu] = useState(false);
  const [activeRoute, setActiveRoute] = useState("home");
  function openSideMenu() {
    setSideMenu(true);
  }
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveRoute(id);
  };

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
          <button
            onClick={() => scrollToSection("home")}
            className="inline-flex items-center gap-1 px-3 text-2xl font-semibold text-dark dark:text-white"
          >
            <Image
              src={logo}
              alt="portfolio minute logo"
              className="h-10 w-10"
            />
            {first && (
              <span>
                {" "}
                {first}
                {second && (
                  <span className={`${themeProps?.textColorMedium}`}>
                    {second}
                  </span>
                )}
              </span>
            )}{" "}
          </button>

          <div className="hidden lg:flex items-center gap-4 transition-all mx-auto">
            {navItems.slice(0, 4).map((d, i) => (
              <span
                key={i}
                onClick={() => scrollToSection(d.link as string)}
                className={`flex items-center gap-4  rounded-md  hover:text-gray-800  px-3 py-2 cursor-pointer font-semibold
                ${
                  activeRoute == d.link
                    ? "text-gray-700 bg-gray-100 dark:bg-stone-800 dark:text-gray-100"
                    : "text-gray-500 bg-gray-50  dark:text-gray-400 dark:bg-stone-900 hover:bg-gray-100  hover:dark:bg-stone-800 hover:dark:text-gray-200"
                }
                
                `}
              >
                {d.iconImage && (
                  <d.iconImage
                    className={`w-5 h-5 ${themeProps?.textColorMedium}`}
                  />
                )}
                {d.label}
              </span>
            ))}
          </div>
        </div>

        {/* right side data */}
        <div className=" hidden lg:flex   items-center gap-4 ">
          <ThemeSwitch />

          <button
            className=" flex gap-2 items-center px-3 py-2 rounded-md text-white transition duration-150 ease-in-out btn bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-700 group"
            onClick={() => scrollToSection("contact")}
          >
            Contact <FiPhone className={themeProps?.textColorMedium} />
          </button>
        </div>

        <FiMenu
          onClick={openSideMenu}
          className="cursor-pointer text-3xl lg:hidden dark:text-white"
        />
      </div>
      <MobileNav
        isSideMenuOpen={isSideMenuOpen}
        setSideMenu={setSideMenu}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        scrollToSection={scrollToSection}
        themeProps={themeProps}
      />
    </header>
  );
}

function MobileNav({
  isSideMenuOpen,
  setSideMenu,
  activeRoute,
  setActiveRoute,
  scrollToSection,
  themeProps,
}: {
  isSideMenuOpen: any;
  setSideMenu: any;
  activeRoute?: any;
  setActiveRoute?: any;
  scrollToSection?: any;
  themeProps?: SingleThemeProps;
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
            <div className="flex justify-between dark:text-white">
              <span className="flex gap-2 items-center">
                <Image
                  src={logo}
                  alt="portfolio minute logo"
                  className="h-10 w-10"
                />
              </span>
              <AiOutlineClose
                onClick={() => {
                  setSideMenu((oldVal: any) => !oldVal);
                }}
                className="cursor-pointer text-2xl "
              />
            </div>
            <div className=" flex flex-col text-base gap-2 mt-10">
              {navItems.slice(0, 4).map((d, i) => (
                <SingleNavItem
                  key={i}
                  label={d.label}
                  iconImage={d.iconImage}
                  link={d.link}
                  activeRoute={activeRoute}
                  setActiveRoute={setActiveRoute}
                  scrollToSection={scrollToSection}
                  themeProps={themeProps}
                >
                  {d.children}
                </SingleNavItem>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col  gap-8  mt-4 items-center pb-20">
              <ThemeSwitch text="Change appearance" />
              <button
                className=" flex gap-2 items-center px-3 py-2 rounded-md text-white transition duration-150 ease-in-out btn bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-700 group"
                onClick={() => scrollToSection("contact")}
              >
                Lets connect <FiPhone className={themeProps?.textColorMedium} />
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
    <span
      className={`flex items-center gap-4 rounded-md  px-4 py-3  cursor-pointer
      ${
        d.activeRoute == d.link
          ? "text-gray-700 bg-gray-100 dark:bg-stone-800 dark:text-gray-100"
          : "text-gray-500 bg-gray-50  dark:text-gray-400 dark:bg-stone-900 hover:bg-gray-100  hover:dark:bg-stone-800 hover:dark:text-gray-200"
      }`}
      onClick={() => d.scrollToSection(d.link as string)}
    >
      {d.iconImage && (
        <d.iconImage className={`w-5 h-5 ${d.themeProps?.textColorMedium}`} />
      )}
      {d.label}
    </span>
  );
}
