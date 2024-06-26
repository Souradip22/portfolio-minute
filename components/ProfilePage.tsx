"use client";
import React from "react";
import { Navbar } from "./Navbar";
import { Dot, Mail, Phone, Projector } from "lucide-react";
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
import { gradientColorMap } from "@/lib/constants";

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

  const bgColor = `bg-${theme}-500`;
  const textColor = `text-${theme}-500`;
  const gradientColor = gradientColorMap[theme];
  const borderColor = `border-${theme}-500`;

  return (
    <>
      <Navbar shortName={shortname} theme={theme} />
      <main className="px-4 pt-24  sm:pt-32">
        <div className="space-y-12 prose prose-neutral prose-primary mx-auto dark:prose-invert text-neutral-500 dark:text-neutral-400 ">
          <section className="my-5" id="intro">
            <div className="flex gap-6 not-prose flex-col sm:flex-row items-center sm:items-start">
              <div className="min-w-[150px] flex justify-center flex-col items-center">
                <div
                  className={`flex items-center justify-center w-[150px] h-[150px] text-[70px] font-medium text-white bg-gradient-to-r ${gradientColor} border border-neutral-100 rounded-full dark:border-neutral-800 drop-shadow-xl`}
                >
                  {fullName?.charAt(0)}
                </div>
                <div className={`flex ${textColor} my-4 `}>
                  <SocialLinks socialLinks={socialLinks} theme={theme} />
                </div>
                <div>
                  {openToWork && (
                    <div
                      className={`flex items-center px-1 pr-3 py-1 rounded-full text-sm ${textColor} border ${borderColor}`}
                    >
                      <Dot className="animate-ping" />
                      Open to Work
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col text-center sm:text-left ">
                <h2 className="font-bold text-xl">Hi 👋🏼</h2>
                {bioLines.map((line: string, index: number) => (
                  <p key={index} className="pt-2">
                    {line}
                  </p>
                ))}
                <div className={`flex ${textColor} my-0 justify-center`}>
                  <DeviderSvg />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center my-2 ">
                  {experience && (
                    <div className="flex items-center gap-1">
                      <RiUserStarFill className={`${textColor}`} />
                      Experience : {experience}
                    </div>
                  )}
                  {completedProjects && (
                    <div className="flex items-center gap-1">
                      <Projector className={`${textColor}`} />
                      Completed Projects : {completedProjects}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 justify-between">
                  {userEmail && (
                    <div className="pt-2 flex ">
                      <LinkWrapper
                        href={`mailto:${userEmail}`}
                        className={`flex  items-center gap-1  select-none  cursor-pointer rounded-xl px-4 py-2 sm:py-3 font-medium  h-11   text-white ${bgColor} `}
                      >
                        <Mail size={18} />
                        Email!
                      </LinkWrapper>
                    </div>
                  )}
                  {phone && (
                    <div className="pt-2 flex ">
                      <LinkWrapper
                        href={`tel:${phone}`}
                        className={`flex  items-center gap-1  select-none  cursor-pointer rounded-xl px-4 py-2 sm:py-3 font-medium  h-11  ${textColor} border ${borderColor} `}
                      >
                        <Phone size={18} />
                        Phone
                      </LinkWrapper>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="my-5" id="projects">
            <SectionHeader title="Side Projects" theme={theme} />
            <div className="grid sm:grid-cols-2   gap-4">
              {projects &&
                projects.map((details: any, index: any) => (
                  <ProjectCard
                    key={`projects-${index}`}
                    projectDetails={details}
                    theme={theme}
                  />
                ))}
            </div>
          </section>

          <section className="my-5" id="experience">
            <SectionHeader title="Experience" theme={theme} />
            <div className="grid gap-4">
              {educationWithExperiences &&
                educationWithExperiences.map((details: any, index: any) => (
                  <ExperienceCard
                    key={`experiences-${index}`}
                    expDetails={details}
                    theme={theme}
                  />
                ))}
            </div>
          </section>

          <section className="my-5" id="skills">
            <SectionHeader title="Skills" theme={theme} />
            <div className="flex gap-3 flex-wrap">
              {skills && <SkillsComponent skills={skills} />}
            </div>
          </section>

          <Footer socialLinks={socialLinks} theme={theme} />
        </div>
      </main>
    </>
  );
}
