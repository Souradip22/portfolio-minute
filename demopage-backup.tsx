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

export default function DomainPage({ formValues }: { formValues: any }) {
  const {
    shortname,
    fullName,
    bio,
    phone,
    email,
    skills,
    projects,
    openToWork,
    completedProjects,
    experience,
    eduExpValues,
  } = formValues;
  return (
    <div className="mx-auto flex w-[70%] flex-col h-screen justify-between gap-4 p-4 overflow-y-scroll">
      <Navbar />

      <div className="rounded-2xl bg-white p-6 shadow dark:bg-black dark:shadow-dark lg:col-span-2 lg:p-10">
        <div className="flex flex-col-reverse items-start  lg:flex-row justify-between">
          <div className="">
            <h2 className="text-3xl font-semibold text-dark dark:text-gray-200 lg:text-[40px]">
              Hi, This Is <span className="text-primary">{fullName}</span> 👋
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
            <span>Available For Hire</span>
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

        {/* <div className="mt-10 lg:mt-14">
          <h3 className="text-2xl font-medium text-dark dark:text-gray-200 lg:text-3xl">
            Working With 50+ Brands ✨ Worldwide
          </h3>
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,_minmax(60px,1fr))] gap-2 lg:grid-cols-[repeat(auto-fit,_minmax(80px,1fr))] lg:gap-4">
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/notion.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/webflow.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/mico.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/framer.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/zeplin.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/figma.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/notion.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/webflow.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/mico.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/framer.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/zeplin.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/figma.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/notion.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/webflow.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/mico.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div className="grid h-16 place-content-center rounded-lg bg-light p-3 dark:bg-dark-2 lg:h-20 lg:rounded-2xl lg:p-4">
              <img
                src="assets/img/framer.svg"
                alt=""
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
          </div>
        </div> */}

        <div className={skills.length > 0 ? "mt-10 lg:mt-14" : "hidden"}>
          {skills && skills.length > 0 && (
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <span className="relative text-3xl dark:text-gray-200 font-semibold">
                Skills
                <span className="absolute bottom-0 inset-x-0 h-[40%] bg-purple-400 opacity-50 "></span>
              </span>
            </div>
          )}
          <div className="mt-8">
            <div className="flex gap-x-3 gap-y-3 md:gap-y-3 md:gap-x-3 flex-wrap my-2 w-full mt-4">
              {skills &&
                skills.map((item: any, index: any) => (
                  // <span key={`${index}-skill`}>nextjs </span>https://d26c7l40gvbbg2.cloudfront.net/tool_icons/django.svg
                  <button
                    key={`${index}-skill`}
                    className="bg-gray-100 flex flex-row font-bold gap-3 hover:bg-gray-200 items-center px-4 py-2 rounded-full text-[14px] text-gray-800 hover:-translate-y-1 transform transition duration-800"
                  >
                    <Image
                      src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${item.value}.svg`}
                      alt=""
                      width={12}
                      height={12}
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

        <div className={eduExpValues?.length > 0 ? "mt-10 lg:mt-14" : "hidden"}>
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

        <div className={projects.length > 0 ? "mt-10 lg:mt-14" : "hidden"}>
          {projects && projects.length > 0 && (
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <span className="relative text-3xl dark:text-gray-200 font-semibold">
                Projects
                <span className="absolute bottom-0 inset-x-0 h-[40%] bg-purple-400 opacity-50 "></span>
              </span>
            </div>
          )}
          <div className="mt-8">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-2 w-full mt-4">
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

        <div className="mt-10 lg:mt-14">
          <h3 className="text-2xl font-medium text-dark dark:text-gray-200 lg:text-3xl">
            Awards and Recognitions
          </h3>

          <div className="mt-8 space-y-4">
            <div className="group relative grid grid-cols-1 items-center gap-4 rounded-lg border border-transparent bg-light p-6 transition hover:border-light hover:bg-white dark:bg-dark-2 dark:hover:border-primary dark:hover:bg-black md:grid-cols-4 xl:gap-10">
              <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:gap-6">
                <div className="grid h-10 w-10 shrink-0 place-content-center rounded-lg bg-white transition group-hover:bg-light dark:bg-black dark:group-hover:bg-dark-2">
                  <img
                    src="assets/img/adobe.svg"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>
                <div className="">
                  <h5 className="font-medium leading-tight text-dark dark:text-gray-200 xl:text-lg xl:leading-tight">
                    Adobe Design Contest
                  </h5>
                  <p className="text-muted">2022 - 2023</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M6 9.5a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z"></path>
                  <path d="m12 15.5 3.4 5.89 1.598-3.233 3.598.232-3.4-5.889m-10.394 0-3.4 5.89L7 18.157l1.598 3.232 3.4-5.889"></path>
                </svg>
                <h5 className="font-medium leading-tight text-dark dark:text-gray-200">
                  Runner Up
                </h5>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded bg-white px-3 py-2 text-center text-sm leading-none text-dark transition after:absolute after:inset-0 after:h-full after:w-full after:content-[''] hover:bg-light hover:text-primary dark:bg-black dark:text-gray-200/70 dark:hover:bg-dark-2 dark:hover:text-primary"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 15"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0"
                  >
                    <path d="m9.917 4.583-5.834 5.834m.584-5.834h5.25v5.25"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="group relative grid grid-cols-1 items-center gap-4 rounded-lg border border-transparent bg-light p-6 transition hover:border-light hover:bg-white dark:bg-dark-2 dark:hover:border-primary dark:hover:bg-black md:grid-cols-4 xl:gap-10">
              <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:gap-6">
                <div className="grid h-10 w-10 shrink-0 place-content-center rounded-lg bg-white transition group-hover:bg-light dark:bg-black dark:group-hover:bg-dark-2">
                  <img
                    src="assets/img/dribbble.svg"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>
                <div className="">
                  <h5 className="font-medium leading-tight text-dark dark:text-gray-200 xl:text-lg xl:leading-tight">
                    Dribbble Design Contest
                  </h5>
                  <p className="text-muted">2022 - 2023</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M6 9.5a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z"></path>
                  <path d="m12 15.5 3.4 5.89 1.598-3.233 3.598.232-3.4-5.889m-10.394 0-3.4 5.89L7 18.157l1.598 3.232 3.4-5.889"></path>
                </svg>
                <h5 className="font-medium leading-tight text-dark dark:text-gray-200">
                  Gold Winner
                </h5>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded bg-white px-3 py-2 text-center text-sm leading-none text-dark transition after:absolute after:inset-0 after:h-full after:w-full after:content-[''] hover:bg-light hover:text-primary dark:bg-black dark:text-gray-200/70 dark:hover:bg-dark-2 dark:hover:text-primary"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 15"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0"
                  >
                    <path d="m9.917 4.583-5.834 5.834m.584-5.834h5.25v5.25"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="group relative grid grid-cols-1 items-center gap-4 rounded-lg border border-transparent bg-light p-6 transition hover:border-light hover:bg-white dark:bg-dark-2 dark:hover:border-primary dark:hover:bg-black md:grid-cols-4 xl:gap-10">
              <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:gap-6">
                <div className="grid h-10 w-10 shrink-0 place-content-center rounded-lg bg-white transition group-hover:bg-light dark:bg-black dark:group-hover:bg-dark-2">
                  <img
                    src="assets/img/awwwards.png"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>
                <div className="">
                  <h5 className="font-medium leading-tight text-dark dark:text-gray-200 xl:text-lg xl:leading-tight">
                    Awwwards Nominee
                  </h5>
                  <p className="text-muted">2022 - 2023</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M6 9.5a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z"></path>
                  <path d="m12 15.5 3.4 5.89 1.598-3.233 3.598.232-3.4-5.889m-10.394 0-3.4 5.89L7 18.157l1.598 3.232 3.4-5.889"></path>
                </svg>
                <h5 className="font-medium leading-tight text-dark dark:text-gray-200">
                  Runner Up
                </h5>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded bg-white px-3 py-2 text-center text-sm leading-none text-dark transition after:absolute after:inset-0 after:h-full after:w-full after:content-[''] hover:bg-light hover:text-primary dark:bg-black dark:text-gray-200/70 dark:hover:bg-dark-2 dark:hover:text-primary"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 15"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0"
                  >
                    <path d="m9.917 4.583-5.834 5.834m.584-5.834h5.25v5.25"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="group relative grid grid-cols-1 items-center gap-4 rounded-lg border border-transparent bg-light p-6 transition hover:border-light hover:bg-white dark:bg-dark-2 dark:hover:border-primary dark:hover:bg-black md:grid-cols-4 xl:gap-10">
              <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:gap-6">
                <div className="grid h-10 w-10 shrink-0 place-content-center rounded-lg bg-white transition group-hover:bg-light dark:bg-black dark:group-hover:bg-dark-2">
                  <img
                    src="assets/img/behance.svg"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>
                <div className="">
                  <h5 className="font-medium leading-tight text-dark dark:text-gray-200 xl:text-lg xl:leading-tight">
                    Behance Design Contest
                  </h5>
                  <p className="text-muted">2022 - 2023</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M6 9.5a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z"></path>
                  <path d="m12 15.5 3.4 5.89 1.598-3.233 3.598.232-3.4-5.889m-10.394 0-3.4 5.89L7 18.157l1.598 3.232 3.4-5.889"></path>
                </svg>
                <h5 className="font-medium leading-tight text-dark dark:text-gray-200">
                  Gold Winner
                </h5>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded bg-white px-3 py-2 text-center text-sm leading-none text-dark transition after:absolute after:inset-0 after:h-full after:w-full after:content-[''] hover:bg-light hover:text-primary dark:bg-black dark:text-gray-200/70 dark:hover:bg-dark-2 dark:hover:text-primary"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 15"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0"
                  >
                    <path d="m9.917 4.583-5.834 5.834m.584-5.834h5.25v5.25"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h3 className="text-2xl font-medium text-dark dark:text-gray-200 lg:text-3xl">
              Article and Publications
            </h3>

            <div className="flex items-center gap-2">
              <button
                className="blog-carousel-button-prev grid h-9 w-9 place-content-center rounded-lg border border-muted/30 text-muted transition hover:border-primary hover:text-primary"
                tabIndex={0}
                aria-label="Previous slide"
                aria-controls="swiper-wrapper-da9cfdb10d108ab004"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M4.167 10h11.666M4.167 10l5 5m-5-5 5-5"></path>
                </svg>
              </button>
              <button
                className="blog-carousel-button-next grid h-9 w-9 place-content-center rounded-lg border border-muted/30 text-muted transition hover:border-primary hover:text-primary"
                tabIndex={0}
                aria-label="Next slide"
                aria-controls="swiper-wrapper-da9cfdb10d108ab004"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M4.167 10h11.666m-5 5 5-5m-5-5 5 5"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="swiper blog-carousel swiper-initialized swiper-horizontal swiper-backface-hidden">
              <div
                className="swiper-wrapper"
                id="swiper-wrapper-da9cfdb10d108ab004"
                aria-live="polite"
              >
                <div
                  className="swiper-slide swiper-slide-active"
                  style={{ width: "265.5px", marginRight: "24px" }}
                  role="group"
                  aria-label="1 / 3"
                  data-swiper-slide-index="0"
                >
                  <div className="">
                    <div className="relative">
                      <a
                        href="article.html"
                        className="group block aspect-6/4 overflow-hidden rounded-lg"
                      >
                        <img
                          src="assets/img/blog-img-1.jpg"
                          alt=""
                          className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                        />
                      </a>

                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                        >
                          Development
                        </a>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-medium xl:text-2xl">
                        <a
                          href="article.html"
                          className="inline-block text-dark transition hover:text-primary dark:text-gray-200/70 dark:hover:text-primary"
                        >
                          Want To Upgrade Your Brain? Stop Doing These 7 Things
                        </a>
                      </h2>

                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          15 min read
                        </li>
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          Nov 6, 2023
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="swiper-slide swiper-slide-next"
                  style={{ width: "265.5px", marginRight: "24px" }}
                  role="group"
                  aria-label="2 / 3"
                  data-swiper-slide-index="1"
                >
                  <div className="">
                    <div className="relative">
                      <a
                        href="article.html"
                        className="group block aspect-6/4 overflow-hidden rounded-lg"
                      >
                        <img
                          src="assets/img/blog-img-2.jpg"
                          alt=""
                          className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                        />
                      </a>

                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                        >
                          Development
                        </a>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-medium xl:text-2xl">
                        <a
                          href="article.html"
                          className="inline-block text-dark transition hover:text-primary dark:text-gray-200/70 dark:hover:text-primary"
                        >
                          Want To Upgrade Your Brain? Stop Doing These 7 Things
                        </a>
                      </h2>

                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          15 min read
                        </li>
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          Nov 6, 2023
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="swiper-slide"
                  role="group"
                  aria-label="3 / 3"
                  style={{ width: "265.5px", marginRight: "24px" }}
                  data-swiper-slide-index="2"
                >
                  <div className="">
                    <div className="relative">
                      <a
                        href="article.html"
                        className="group block aspect-6/4 overflow-hidden rounded-lg"
                      >
                        <img
                          src="assets/img/blog-img-3.jpg"
                          alt=""
                          className="h-full w-full rounded-lg object-cover transition duration-700 group-hover:scale-105"
                        />
                      </a>

                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center gap-2 rounded bg-white px-2 py-1 text-center text-xs leading-none text-primary shadow transition hover:bg-primary hover:text-white"
                        >
                          Development
                        </a>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-medium xl:text-2xl">
                        <a
                          href="article.html"
                          className="inline-block text-dark transition hover:text-primary dark:text-gray-200/70 dark:hover:text-primary"
                        >
                          Want To Upgrade Your Brain? Stop Doing These 7 Things
                        </a>
                      </h2>

                      <ul className="mt-4 flex flex-wrap items-center gap-2">
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          15 min read
                        </li>
                        <li className="relative text-sm text-muted/50 before:mr-1 before:content-['\2022'] dark:text-muted">
                          Nov 6, 2023
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              ></span>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
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
        </div>
      </div>
    </div>
  );
}