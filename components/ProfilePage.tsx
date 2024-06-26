"use client";
import React, { useState } from "react";
import { Navbar } from "./Navbar";
import Image from "next/image";
import { Mail, Projector } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Footer from "./Footer";
import { profileFormDefaultValues } from "@/lib/defaultValues";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import SkillsComponent from "./SkillsComponent";
import { LinkWrapper } from "./LinkWrapper";
import { RiUserStarFill } from "react-icons/ri";
import SocialLinks from "./SocialLinks";
import DeviderSvg from "./DeviderSvg";

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
    educationWithExperiences,
    socialLinks,
    theme,
    font,
  } = profileDetails || profileFormDefaultValues;
  console.log("theme", theme);
  const bioLines = bio.split(/  /);

  return (
    <>
      <Navbar shortName={shortname} />
      <main className="px-4 pt-24  sm:pt-32">
        <div className="space-y-12 prose prose-neutral prose-primary mx-auto dark:prose-invert text-neutral-500 dark:text-neutral-400 ">
          <section className="my-5" id="intro">
            <div className="flex gap-6 not-prose flex-col sm:flex-row items-center sm:items-start">
              <div className="min-w-[150px]">
                <div className="flex items-center justify-center w-[150px] h-[150px] text-[70px] font-medium text-white bg-gradient-to-r from-teal-400 to-yellow-200 border border-neutral-100 rounded-full dark:border-neutral-800 drop-shadow-xl">
                  {fullName?.charAt(0)}
                </div>
                <div className="flex text-primary-500 my-4 justify-start">
                  <SocialLinks socialLinks={socialLinks} />
                </div>
              </div>
              <div className="flex flex-col text-center sm:text-left ">
                <h2 className="font-bold text-xl">Hi 👋🏼</h2>
                {bioLines.map((line: string, index: number) => (
                  <p key={index} className="pt-2">
                    {line}
                  </p>
                ))}
                <div className="flex text-primary-500 my-0 justify-center">
                  <DeviderSvg />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center my-2">
                  {experience && (
                    <div className="flex items-center gap-1">
                      <RiUserStarFill className="text-primary-500" />
                      Experience : {experience}
                    </div>
                  )}
                  {completedProjects && (
                    <div className="flex items-center gap-1">
                      <Projector className="text-primary-500" />
                      Completed Projects : {completedProjects}
                    </div>
                  )}
                </div>
                {userEmail && (
                  <div className="pt-2 flex justify-center sm:justify-start">
                    <LinkWrapper
                      href={`mailto:${userEmail}`}
                      className=" flex  items-center gap-1  select-none  cursor-pointer rounded-xl px-4 py-2 sm:py-3 font-medium  h-11  bg-primary-500 text-white "
                    >
                      <span className="block">
                        <Mail className="block w-5 h-5" />
                      </span>
                      Say Hello!
                    </LinkWrapper>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="my-5" id="projects">
            <SectionHeader title="Side Projects" />
            <div className="grid sm:grid-cols-2   gap-4">
              {projects &&
                projects.map((details: any, index: any) => (
                  <ProjectCard
                    key={`projects-${index}`}
                    projectDetails={details}
                  />
                ))}
            </div>
          </section>

          <section className="my-5" id="experience">
            <SectionHeader title="Experience" />
            <div className="grid gap-4">
              {educationWithExperiences &&
                educationWithExperiences.map((details: any, index: any) => (
                  <ExperienceCard
                    key={`experiences-${index}`}
                    expDetails={details}
                  />
                ))}
            </div>
          </section>

          <section className="my-5" id="skills">
            <SectionHeader title="Skills" />
            <div className="flex gap-3 flex-wrap">
              {skills && <SkillsComponent skills={skills} />}
            </div>
          </section>

          <Footer socialLinks={socialLinks} />
        </div>
      </main>
    </>
  );
}
