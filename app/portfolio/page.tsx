"use client";
import React from "react";
import { SignOutButton } from "@/components/AuthButtons";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import circleText from "@/assets/img/circle-text.svg";
import circleTextLight from "@/assets/img/circle-text-light.svg";
import { FaGithub } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { socialLinksSVGs } from "@/components/social-links";
import { Skeleton } from "@/components/ui/skeleton";
import { formDefaultValues } from "@/lib/defaultValues";

export default function PortfolioPage({ formValues }: { formValues: any }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000);
  }, []);
  const {
    shortname,
    fullName,
    bio,
    phone,
    email,
    skills,
    projects,
    isOpenToWork: openToWork,
    completedProjects,
    experience,
    educationWithExperiences: eduExpValues,
    socialLinks,
    theme,
    font,
  } = formDefaultValues;

  return (
    <div className="w-full overflow-y-scroll">
      <div className="mx-auto flex w-full md:w-[70%] flex-col h-screen justify-between gap-4 px-4 ">
        <div
          className=" bg-purple-400 bg-indigo-400 bg-amber-400 bg-lime-400 bg-pink-400 text-indigo-600 text-purple-600
       text-lime-600 text-amber-600 text-pink-600"
        >
          <div></div>
        </div>
        <Navbar />
        {mounted ? (
          <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
            <div className="flex flex-col-reverse items-start  lg:flex-row justify-between">
              <div className="">
                <h2 className="text-3xl font-semibold text-dark dark:text-gray-200 lg:text-[40px]">
                  Hi, This Is{" "}
                  <span className={`text-${theme}-600`}>{fullName}</span> 👋
                </h2>
                <p className="mt-4 text-lg text-muted dark:text-gray-200/70 lg:mt-6 lg:text-2xl">
                  {bio}
                </p>
              </div>
              <div
                className={
                  !openToWork
                    ? "hidden"
                    : "flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-purple-100 px-4 py-2 text-center text-base font-medium leading-none text-primary dark:bg-dark-2 lg:text-lg"
                }
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 dark:bg-light"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <span>
                  Available For Hire {theme} {font}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-between gap-6 lg:mt-12 lg:gap-10">
              <div className="flex flex-wrap items-start gap-6 lg:gap-10">
                <div className={experience ? "" : "hidden"}>
                  <h2 className="text-3xl font-semibold text-dark dark:text-gray-200 lg:text-[40px]">
                    <span>{experience}</span>+
                  </h2>
                  <p className="mt-2 text-muted">Year of Experience</p>
                </div>
                <div className={completedProjects ? "" : "hidden"}>
                  <h2 className="text-3xl font-semibold text-dark dark:text-gray-200 lg:text-[40px]">
                    <span>{completedProjects}</span>+
                  </h2>
                  <p className="mt-2 text-muted">Project Completed</p>
                </div>
              </div>

              <div className="relative -mt-6 hidden h-[100px] w-[100px] p-4 lg:block xl:-mt-10">
                <Image
                  src={circleText}
                  alt=""
                  className="absolute inset-0 h-full w-full animate-spin-slow dark:hidden"
                />
                <Image
                  src={circleTextLight}
                  alt=""
                  className="absolute inset-0 hidden h-full w-full animate-spin-slow dark:block"
                />
                <div className="grid h-full w-full place-content-center rounded-full bg-primary text-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-10 w-10"
                  >
                    <path d="M20 5v30m-5-5 5 5 5-5"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-8 w-full  flex flex-wrap justify-between  lg:mt-12 gap-4">
              <div className="flex flex-wrap justify-between gap-2 items-end">
                {socialLinks?.map((item: any, index: any) => {
                  return (
                    item.value !== "" &&
                    item.label !== "resume" && (
                      <a
                        key={`${index}-socialLink`}
                        target="_blank"
                        href={item.value}
                        className="w-10 h-10 border rounded-xl  bg-gray-50 flex items-center justify-center"
                      >
                        {socialLinksSVGs &&
                          // @ts-ignore
                          socialLinksSVGs[item.label]}{" "}
                      </a>
                    )
                  );
                })}
              </div>
              {socialLinks?.map((item: any, index: any) => {
                return (
                  item.value !== "" &&
                  item.label == "resume" && (
                    <a
                      key={`${index}-socialLink`}
                      className="relative inline-flex items-center justify-center leading-normal no-underline group cursor-pointer select-none focus:outline-none peer md:peer-even:ml-6"
                      target="_blank"
                      href={item.value}
                    >
                      <div className="bg-white border border-amber-600 border-dashed flex group-active:border-alpha h-full hover:translate-x-2 hover:translate-y-2 mt- not-prose px-6 py-3 text-black text-sm transform-gpu transition-transform w-full z-10">
                        <span className="mx-auto">
                          <p>Download Resume</p>
                        </span>
                      </div>
                      <div className="absolute h-full w-full bg-gradient-to-r from-indigo-500 to-pink-500 top-2 left-2"></div>
                    </a>
                  )
                );
              })}
            </div>

            <div
              className={skills && skills.length ? "mt-10 lg:mt-14" : "hidden"}
            >
              {skills && skills.length > 0 && (
                <div className="relative flex flex-wrap items-center justify-between gap-6">
                  <span className="relative text-3xl dark:text-gray-200 font-semibold">
                    Skills
                    <span
                      className={`absolute bottom-0 inset-x-0 h-[40%] bg-${theme}-400 opacity-50`}
                    ></span>
                  </span>
                </div>
              )}
              <div className="mt-8">
                <div className="flex gap-x-3 gap-y-3 md:gap-y-3 md:gap-x-3 flex-wrap my-2 w-full mt-4">
                  {skills &&
                    skills.map((item: any, index: any) => (
                      <button
                        key={`${index}-skill`}
                        className="bg-gray-100 flex flex-row font-bold gap-3 hover:bg-gray-200 items-center px-4 py-2 rounded-full text-[14px] text-gray-800 hover:-translate-y-1 transform transition duration-800"
                      >
                        <Image
                          src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${item.value}.svg`}
                          alt=""
                          width={16}
                          height={16}
                          className=""
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none"; // Hide the image if it fails to load
                          }}
                        />
                        {item.label}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div
              className={
                eduExpValues && eduExpValues?.length > 0
                  ? "mt-10 lg:mt-14"
                  : "hidden"
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  {eduExpValues && eduExpValues.length > 0 && (
                    <div className="relative flex flex-wrap items-center justify-between gap-6">
                      <span className="relative text-3xl dark:text-gray-200 font-semibold">
                        Experience
                        <span className="absolute bottom-0 inset-x-0 h-[40%] bg-purple-400 opacity-50 "></span>
                      </span>
                    </div>
                  )}
                  {eduExpValues?.map(
                    (item: any, index: any) =>
                      item.type === "company" && (
                        <div
                          key={`${index}-company`}
                          className="my-4 border-grey-100 border-l-2 border-purple-800 dark:border dark:border-zinc-800 rounded-md p-4 w-full relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                        >
                          <span className="absolute w-[80%] -bottom-px right-1-px h-px bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-purple-600/0 dark:from-purple-600/0 dark:via-purple-600/40 dark:to-purple-600/0"></span>
                          <span className="absolute w-px -right-px h-[40%] bg-gradient-to-b from-purple-600/0 via-purple-600/40 to-purple-600/0 dark:from-purple-600/0 dark:via-purple-600/40 dark:to-purple-600/0"></span>
                          <div className="flex items-center text-gray-900 dark:text-gray-100">
                            <span className="mt-1 text-gray-400 dark:text-gray-400 inline-block line-clamp-1">
                              {item?.fromDate} - {item?.toDate}
                            </span>
                          </div>
                          <h3 className="font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
                            {item?.designation}
                          </h3>
                          <p className="mt-1 text-gray-700 dark:text-gray-400 text-sm ">
                            {item?.orgName}, {item?.location}
                          </p>
                        </div>
                      )
                  )}
                </div>
                <div>
                  {skills && skills.length > 0 && (
                    <div className="relative flex flex-wrap items-center justify-between gap-6">
                      <span className="relative text-3xl dark:text-gray-200 font-semibold">
                        Education
                        <span className="absolute bottom-0 inset-x-0 h-[40%] bg-purple-400 opacity-50 "></span>
                      </span>
                    </div>
                  )}
                  {eduExpValues?.map(
                    (item: any, index: any) =>
                      item.type === "school" && (
                        <div
                          key={`${index}-school`}
                          className="my-4 border-grey-100 border-l-2 border-purple-800 dark:border dark:border-zinc-800 rounded-md p-4 w-full relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                        >
                          <span className="absolute w-[80%] -bottom-px right-1-px h-px bg-gradient-to-r from-purple-600/0 via-purple-600/40 to-purple-600/0 dark:from-purple-600/0 dark:via-purple-600/40 dark:to-purple-600/0"></span>
                          <span className="absolute w-px -right-px h-[40%] bg-gradient-to-b from-purple-600/0 via-purple-600/40 to-purple-600/0 dark:from-purple-600/0 dark:via-purple-600/40 dark:to-purple-600/0"></span>
                          <div className="flex items-center text-gray-900 dark:text-gray-100">
                            <span className="mt-1 text-gray-400 dark:text-gray-400 inline-block line-clamp-1">
                              {item?.fromDate} - {item?.toDate}
                            </span>
                          </div>
                          <h3 className="font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
                            {item?.designation}
                          </h3>
                          <p className="mt-1 text-gray-700 dark:text-gray-400 text-sm ">
                            {item?.orgName}, {item?.location}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            <div
              className={
                projects && projects.length > 0 ? "mt-10 lg:mt-14" : "hidden"
              }
            >
              {projects && projects.length > 0 && (
                <div className="relative flex flex-wrap items-center justify-between gap-6">
                  <span className="relative text-3xl dark:text-gray-200 font-semibold">
                    Projects
                    <span className="absolute bottom-0 inset-x-0 h-[40%] bg-purple-400 opacity-50 "></span>
                  </span>
                </div>
              )}
              <div className="mt-8">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-2 w-full mt-4">
                  {projects &&
                    projects.map((item: any, index: any) => (
                      <div
                        className="border-grey-100 border-t-4 dark:bg-gray-900 border-purple-600  rounded-md p-4 w-full relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:shadow-2xl dark:shadow-blue-500/20"
                        key={`${index}-project`}
                      >
                        <span className="absolute w-[80%] -bottom-px right-px h-px bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0 dark:from-purple-400/0 dark:via-purple-400/40 dark:to-purple-400/0"></span>
                        <div className="flex items-center text-gray-900 dark:text-gray-100">
                          <span className="flex flex-row justify-between text-gray-600 mt-1 w-full text-sm">
                            {item.repositoryUrl && (
                              <a href={item.repositoryUrl}>
                                <span className="flex items-center gap-2">
                                  <FaGithub /> Code
                                </span>
                              </a>
                            )}
                            {item.demoUrl && (
                              <a href={item.demoUrl}>
                                <span className="flex items-center gap-2">
                                  <FaExternalLinkAlt /> Demo
                                </span>
                              </a>
                            )}
                          </span>
                        </div>
                        <h3 className="font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
                          {item.projectName}
                        </h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-400 text-sm ">
                          {item.projectDescription}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <footer className="">
              <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16  lg:pt-24">
                {/* <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 ">
                Customise Your Product
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
                maiores ipsum eos temporibus ea nihil.
              </p>
            </div> */}

                <div className="relative flex flex-wrap items-center justify-center gap-6 text-center">
                  <span className="relative text-3xl dark:text-gray-200 font-semibold">
                    Let&apos;s work together
                    <span
                      className={`absolute bottom-0 inset-x-0 h-[40%] bg-${theme}-400 opacity-50`}
                    ></span>
                  </span>
                </div>
                <p className="mx-auto mt-4  text-gray-900 dark:text-gray-200 text-center text-lg">
                  {email && (
                    <>
                      Drop me a mail at{" "}
                      <a
                        href={`mailto:${email}`}
                        className="border-b border-amber-400 hover:border-b-2"
                      >
                        {email}
                      </a>
                    </>
                  )}{" "}
                  {email && phone && <>or</>}{" "}
                  {phone && (
                    <span className="border-b border-amber-400 hover:border-b-2">
                      call me at {phone}
                    </span>
                  )}
                </p>
                <div className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between">
                  <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
                    <li>
                      <a
                        href="#"
                        className="text-gray-500 transition hover:opacity-75"
                      >
                        {" "}
                        Terms & Conditions{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-gray-500 transition hover:opacity-75"
                      >
                        {" "}
                        Privacy Policy{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-gray-500 transition hover:opacity-75"
                      >
                        {" "}
                        Cookies{" "}
                      </a>
                    </li>
                  </ul>

                  <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
                    {socialLinks?.map((item: any, index: any) => {
                      return (
                        item.value !== "" &&
                        item.label !== "resume" && (
                          <li key={`${index}-footerSocialLinks`}>
                            <a
                              key={`${index}-socialLink`}
                              target="_blank"
                              href={item.value}
                              className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center"
                            >
                              {socialLinksSVGs &&
                                // @ts-ignore
                                socialLinksSVGs[item.label]}{" "}
                            </a>
                          </li>
                        )
                      );
                    })}
                  </ul>
                </div>
              </div>
            </footer>
            {/* <div className="mt-10 lg:mt-14">
          <div className="group flex gap-6 overflow-hidden rounded-lg bg-light p-6 dark:bg-dark-2">
            <div className="relative flex min-w-full shrink-0 animate-infinite-scroll gap-6 group-hover:[animation-play-state:paused]">
              <a
                href="contact.html"
                className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
              >
                Let&apos;s 👋 Work Together
              </a>
              <a
                href="contact.html"
                className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
              >
                Let&apos;s 👋 Work Together
              </a>
            </div>
            <div className="relative flex min-w-full shrink-0 animate-infinite-scroll gap-6 group-hover:[animation-play-state:paused]">
              <a
                href="contact.html"
                className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
              >
                Let&apos;s 👋 Work Together
              </a>
              <a
                href="contact.html"
                className="relative inline-block whitespace-nowrap text-3xl font-medium text-muted transition before:mr-3 before:content-['\2022'] hover:text-dark dark:text-muted dark:hover:text-white md:text-[40px]"
              >
                Let&apos;s 👋 Work Together
              </a>
            </div>
          </div>
        </div> */}
          </div>
        ) : (
          <div>
            <Skeleton className="h-[400px] w-full rounded-xl bg-gray-200" />
            <Skeleton className="h-[400px] w-full mt-2 rounded-xl bg-gray-200" />

            <Skeleton className="h-[400px] w-full mt-2  rounded-xl bg-gray-200" />
            <Skeleton className="h-[400px] w-full mt-2  rounded-xl bg-gray-200" />
            <Skeleton className="h-[400px] w-full mt-2  rounded-xl bg-gray-200" />
          </div>
        )}
      </div>
    </div>
  );
}
