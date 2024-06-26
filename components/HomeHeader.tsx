"use client";
import React from "react";
import logo from "@/public/logo/logo-no-background.svg";
import Image from "next/image";
import { LinkWrapper } from "./LinkWrapper";
import { BsGithub } from "react-icons/bs";

export default function HomeHeader() {
  return (
    <>
      <header className="sticky top-0 z-10 w-full bg-neutral-900">
        <div className=" max-w-4xl mx-auto text-sm flex items-center justify-between h-16 px-5">
          <div className="flex items-center max-w-5xl">
            <a href={"/"} className="flex items-center gap-2 px-3 ">
              <Image
                src={logo}
                alt="Portfolio Minute logo"
                width={1200}
                height={600}
                className=" h-10 w-10 rounded-md"
              />
              <span className="text-neutral-100 text-lg font-bold">
                Portfolio Minute
              </span>
            </a>
          </div>
          {/* <ThemeSwitch /> */}
          <LinkWrapper
            href="https://github.com/Souradip22/portfolio-minute"
            className="flex items-center  bg-neutral-800 rounded-md p-2 text-neutral-200 hover:text-neutral-100 hover:scale-110"
          >
            <BsGithub size={18} />
          </LinkWrapper>
        </div>

        <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0"></hr>
      </header>
      <span className="absolute md:top-[30%] md:left-[30%] dark:bg-green-600 blur-[150px] size-[150px] top-[50%] left-[50%] bg-green-400"></span>
      <section className="mx-auto flex max-w-4xl flex-col gap-2 pt-12 px-8 relative text-neutral-100 justify-center">
        <h1 className="md:text-[4rem] text-[2rem] font-bold  text-3xl md:text-6xl   mx-auto">
          Create. Share.
          <mark className="px-2 text-white bg-green-600 rounded">Shine.</mark>
        </h1>
        <div className="w-full flex-wrap my-2 text-center">
          Easily build your online presence with Portfolio Minute in three
          simple steps: Sign in, enter your details, and create.
        </div>
      </section>
    </>
  );
}
