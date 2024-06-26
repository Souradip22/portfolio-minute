"use client";

import { usePathname } from "next/navigation";
import {
  BriefcaseBusinessIcon,
  HomeIcon,
  LayersIcon,
  Menu,
  MessagesSquareIcon,
  Moon,
  NewspaperIcon,
  NotebookPenIcon,
  X,
} from "lucide-react";
import { LinkWrapper } from "./LinkWrapper";
import { useState, type FC } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const pages = [
  { name: "Home", path: "#intro", icon: HomeIcon },
  { name: "Projects", path: "#projects", icon: BriefcaseBusinessIcon },
  { name: "Experience", path: "#experience", icon: NotebookPenIcon },
  { name: "Skills", path: "#skills", icon: NewspaperIcon },
];

export const Navbar: FC<{ shortName: string }> = ({ shortName }) => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? path === pathname : pathname.startsWith(path);
  console.log("path", pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "flex fixed w-11/12 sm:w-full max-w-[648px] top-6 left-1/2 transform -translate-x-1/2 justify-between items-center backdrop-blur-sm backdrop-filter text-sm py-3 pl-4 pr-3 rounded-[8px]",
        "bg-neutral-100 dark:bg-neutral-800 z-50"
      )}
    >
      <div className="font-extrabold">{shortName}</div>
      <button
        className="sm:hidden block"
        type="button"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation"
      >
        {!isMobileMenuOpen ? <Menu /> : <X />}
      </button>
      <div className="items-center space-x-4 font-medium hidden sm:flex">
        <>
          {pages.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "relative space-x-1",
                isActive(link.path)
                  ? "font-bold text-primary-500 "
                  : "text-neutral-500 dark:text-neutral-400 "
              )}
            >
              <span className="">{link.name}</span>
            </Link>
          ))}
          <ThemeSwitch />
        </>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-[86%] left-0 right-0 font-medium rounded-b-xl bg-neutral-100 dark:bg-neutral-800">
          <div className="flex flex-col px-4 py-2 z-50">
            <>
              {pages.map((link) => (
                <LinkWrapper
                  key={link.path}
                  href={link.path}
                  label={link.name}
                  className={cn(
                    " py-2",
                    isActive(link.path)
                      ? "font-bold text-primary-500 "
                      : "text-neutral-500 dark:text-neutral-400 "
                  )}
                >
                  <span className="">{link.name}</span>
                </LinkWrapper>
              ))}
              <ThemeSwitch />
            </>
          </div>
        </div>
      )}
    </nav>
  );
};
