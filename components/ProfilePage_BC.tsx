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
import { profileFormDefaultValues } from "@/lib/defaultValues";
import { SingleThemeProps, ThemeOptions } from "@/lib/types";
import { ALL_THEMES_PROPS, navItems } from "@/lib/constants";
import Link from "next/link";
import FooterBanner from "./FooterBanner";

export default function ProfilePage({
  profileDetails,
}: {
  profileDetails: any;
}) {
  const {
    shortname,
    fullName,
    bio,
    phone,
    userEmail,
    skills,
    projects,
    isOpenToWork: openToWork,
    completedProjects,
    experience,
    educationWithExperiences: eduExpValues,
    socialLinks,
    theme,
    font,
  } = profileDetails || profileFormDefaultValues;
  let themeProps: SingleThemeProps = ALL_THEMES_PROPS.amber;
  if (theme) {
    themeProps = ALL_THEMES_PROPS[theme];
  }

  return (
    <div className="mx-auto flex flex-col justify-between gap-4 px-4 lg:px-8  overflow-y-auto  h-screen pb-8 pt-4">
      <div
        className="hidden 
    bg-amber-100 bg-amber-400 bg-amber-800
    border-amber-100 border-amber-400 border-amber-800
    text-amber-100 text-amber-400 text-amber-800
    from-amber-600/0 via-amber-600/40 to-amber-600/0
    bg-purple-100 bg-purple-400 bg-purple-800
    border-purple-100 border-purple-400 border-purple-800
    text-purple-100 text-purple-400 text-purple-800
    from-purple-600/0 via-purple-600/40 to-purple-600/0
    bg-lime-100 bg-lime-400 bg-lime-800
    border-lime-100 border-lime-400 border-lime-800
    text-lime-100 text-lime-400 text-lime-800
    from-lime-600/0 via-lime-600/40 to-lime-600/0
    bg-indigo-100 bg-indigo-400 bg-indigo-800
    border-indigo-100 border-indigo-400 border-indigo-800
    text-indigo-100 text-indigo-400 text-indigo-800
    from-indigo-600/0 via-indigo-600/40 to-indigo-600/0
    bg-pink-100 bg-pink-400 bg-pink-800
    border-pink-100 border-pink-400 border-pink-800
    text-pink-100 text-pink-400 text-pink-800
    from-pink-600/0 via-pink-600/40 to-pink-600/0
    bg-cyan-100 bg-cyan-400 bg-cyan-800
    border-cyan-100 border-cyan-400 border-cyan-800
    text-cyan-100 text-cyan-400 text-cyan-800
    from-cyan-600/0 via-cyan-600/40 to-cyan-600/0"
      ></div>

      <Navbar shortname={shortname} themeProps={themeProps} />

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
        <section id="home">
          <div className="flex flex-col-reverse items-start  lg:flex-row justify-between">
            <div className="">
              <h2 className="text-3xl font-semibold text-dark dark:text-gray-200 lg:text-[40px]">
                Hi, This is{" "}
                <span className={`${themeProps.textColorMedium}`}>
                  {fullName}
                </span>{" "}
                👋
              </h2>
              <p className="mt-4 text-lg text-muted dark:text-gray-200/70 lg:mt-6 lg:text-2xl">
                {bio}
              </p>
            </div>
            <div
              className={
                !openToWork
                  ? "hidden"
                  : `flex mb-4 items-center justify-center gap-2 whitespace-nowrap rounded-md  px-4 py-2 text-center text-base font-medium leading-none dark:bg-dark-2 lg:text-lg  ${themeProps.textColorMedium}  bg-gradient-to-r from-stone-800 to-stone-700`
              }
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75  ${themeProps.bgColorMedium}`}
                ></span>
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full  ${themeProps.bgColorMedium}`}
                ></span>
              </span>
              <span>Available To Work</span>
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
              <div
                className={`grid h-full w-full place-content-center rounded-full ${themeProps.bgColorMedium}`}
              >
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
                    <div
                      className={` border ${themeProps.borderColorMedium}  border-dashed flex group-active:border-alpha h-full hover:translate-x-2 hover:translate-y-2  px-6 py-3 text-black text-sm transition-transform w-full z-[2] ${themeProps.bgColorLight} `}
                    >
                      <span className="mx-auto">
                        <p>View Resume</p>
                      </span>
                    </div>
                    <div className="absolute h-full w-full bg-gradient-to-r from-indigo-500 to-pink-500 top-2 left-2"></div>
                  </a>
                )
              );
            })}
          </div>
        </section>

        <section id="skills">
          <div className={skills?.length > 0 ? "mt-10 lg:mt-14" : "hidden"}>
            {skills && skills.length > 0 && (
              <div className="relative flex flex-wrap items-center justify-between gap-6">
                <span className="relative text-3xl dark:text-gray-200 font-semibold">
                  Skills
                  <span
                    className={`absolute bottom-0 inset-x-0 h-[40%] ${themeProps.bgColorMedium} opacity-50`}
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
                      className={` flex flex-row font-bold gap-3 hover:bg-gray-200 items-center px-4 py-2 rounded-full text-[14px] text-gray-800 hover:-translate-y-1 transform transition duration-800 bg-gray-50 border-b ${themeProps.borderColorMedium} `}
                    >
                      <Image
                        src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${item.value}.svg`}
                        alt=""
                        width={16}
                        height={16}
                        className=""
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none"; // Hide the image if it fails to load
                        }}
                      />
                      {item.label}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div
            className={eduExpValues?.length > 0 ? "mt-10 lg:mt-14" : "hidden"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                {eduExpValues && eduExpValues.length > 0 && (
                  <div className="relative flex flex-wrap items-center justify-between gap-6">
                    <span className="relative text-3xl dark:text-gray-200 font-semibold">
                      Experience
                      <span
                        className={`absolute bottom-0 inset-x-0 h-[40%] ${themeProps.bgColorMedium} opacity-50`}
                      ></span>
                    </span>
                  </div>
                )}
                {eduExpValues?.map(
                  (item: any, index: any) =>
                    item.type === "company" && (
                      <div
                        key={`${index}-company`}
                        className={`mt-8 border-grey-100 border-l-2  rounded-md p-4 w-full relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${themeProps.borderColorMedium}`}
                      >
                        <span
                          className={`absolute w-[80%] -bottom-px right-1-px h-px bg-gradient-to-r ${themeProps.fromColor} ${themeProps.viaColor} ${themeProps.toColor} dark:${themeProps.fromColor}dark:${themeProps.viaColor} dark:${themeProps.toColor} `}
                        ></span>

                        <span
                          className={`absolute w-px -right-px h-[40%] bg-gradient-to-b ${themeProps.fromColor} ${themeProps.viaColor} ${themeProps.toColor} dark:${themeProps.fromColor}dark:${themeProps.viaColor} dark:${themeProps.toColor} `}
                        ></span>

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
                {eduExpValues && eduExpValues.length > 0 && (
                  <div className="relative flex flex-wrap items-center justify-between gap-6">
                    <span className="relative text-3xl dark:text-gray-200 font-semibold">
                      Education
                      <span
                        className={`absolute bottom-0 inset-x-0 h-[40%] ${themeProps.bgColorMedium} opacity-50`}
                      ></span>
                    </span>
                  </div>
                )}
                {eduExpValues?.map(
                  (item: any, index: any) =>
                    item.type === "school" && (
                      <div
                        key={`${index}-school`}
                        className={`mt-8 border-grey-100 border-l-2  rounded-md p-4 w-full relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${themeProps.borderColorMedium}`}
                      >
                        <span
                          className={`absolute w-[80%] -bottom-px right-1-px h-px bg-gradient-to-r ${themeProps.fromColor} ${themeProps.viaColor} ${themeProps.toColor} dark:${themeProps.fromColor}dark:${themeProps.viaColor} dark:${themeProps.toColor} `}
                        ></span>

                        <span
                          className={`absolute w-px -right-px h-[40%] bg-gradient-to-b ${themeProps.fromColor} ${themeProps.viaColor} ${themeProps.toColor} dark:${themeProps.fromColor}dark:${themeProps.viaColor} dark:${themeProps.toColor} `}
                        ></span>

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
        </section>

        <section id="projects">
          <div className={projects?.length > 0 ? "mt-10 lg:mt-14" : "hidden"}>
            {projects && projects.length > 0 && (
              <div className="relative flex flex-wrap items-center justify-between gap-6">
                <span className="relative text-3xl dark:text-gray-200 font-semibold">
                  Projects
                  <span
                    className={`absolute bottom-0 inset-x-0 h-[40%] ${themeProps.bgColorMedium} opacity-50`}
                  ></span>
                </span>
              </div>
            )}
            <div className="mt-8">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-2 w-full mt-4">
                {projects &&
                  projects.map((item: any, index: any) => (
                    <div
                      className={`border-grey-100 border-t-4  rounded-md p-4 w-full relative shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  dark:shadow-blue-500/20 ${themeProps.borderColorMedium}`}
                      key={`${index}-project`}
                    >
                      <span
                        className={`absolute w-[80%] -bottom-px right-px h-px bg-gradient-to-r  ${themeProps.fromColor} ${themeProps.viaColor} ${themeProps.toColor} dark:${themeProps.fromColor}dark:${themeProps.viaColor} dark:${themeProps.toColor} `}
                      ></span>

                      <div className="flex items-center text-gray-900 dark:text-gray-100">
                        <span className="flex flex-row justify-between text-gray-600 mt-1 w-full text-sm">
                          {item.repositoryUrl && (
                            <a href={item.repositoryUrl} target="_blank">
                              <span className="flex items-center gap-2">
                                <FaGithub /> Code
                              </span>
                            </a>
                          )}
                          {item.demoUrl && (
                            <a href={item.demoUrl} target="_blank">
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
        </section>
        <footer id="contact">
          <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16  lg:pt-24">
            <div className="relative flex flex-wrap items-center justify-center gap-6 text-center">
              <span className="relative text-3xl dark:text-gray-200 font-semibold">
                Let&apos;s 👋 work together
                <span
                  className={`absolute bottom-0 inset-x-0 h-[40%] ${themeProps.bgColorMedium} opacity-50`}
                ></span>
              </span>
            </div>
            <div className="mx-auto mt-4  text-gray-900 dark:text-gray-200 text-center text-lg">
              {userEmail && (
                <>
                  Drop me a mail at{" "}
                  <a
                    href={`mailto:${userEmail}`}
                    className={`border-b hover:border-b-2 ${themeProps.borderColorMedium}`}
                  >
                    {userEmail}
                  </a>
                </>
              )}{" "}
              {userEmail && phone && <>or</>}{" "}
              {phone && (
                <span
                  className={`border-b hover:border-b-2 ${themeProps.borderColorMedium}`}
                >
                  call me at {phone}
                </span>
              )}
            </div>
            <div className="mx-auto mt-8  text-center text-lg">
              <ul className=" flex flex-wrap justify-center gap-6  ">
                {socialLinks &&
                  socialLinks.map((item: any, index: any) => {
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
            <FooterBanner />
          </div>
        </footer>
      </div>
    </div>
  );
}
