import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";
import React from "react";
import { LinkWrapper } from "./LinkWrapper";

interface ProjectCardProps {
  projectDetails: {
    demoUrl?: string;
    profileId?: string;
    projectDescription: string;
    projectName: string;
    repositoryUrl?: string;
  };
  showIcons?: boolean;
  theme?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectDetails,
  showIcons = true,
  theme,
}) => {
  console.log("project details", projectDetails);
  const { demoUrl, repositoryUrl, projectName, projectDescription } =
    projectDetails;

  const textColor = `text-${theme}-500`;

  return (
    <article className="not-prose group p-4 relative border border-neutral-200 rounded-xl text-neutral-500 dark:bg-neutral-800 dark:border-neutral-800 dark:text-neutral-400">
      {showIcons && (
        <>
          <div
            className={`absolute top-5 right-5 flex gap-3 items-center cursor-pointer ${textColor}`}
          >
            {demoUrl && (
              <LinkWrapper href={demoUrl}>
                <ExternalLink className="w-4 h-4 hover:scale-110" />
              </LinkWrapper>
            )}
            {repositoryUrl && (
              <LinkWrapper href={repositoryUrl}>
                <Github className="w-4 h-4 hover:scale-110" />
              </LinkWrapper>
            )}
          </div>
          <div
            className={`flex w-11 h-11 justify-center items-center rounded-xl border font-bold text-xl shadow-sm border-neutral-100 dark:bg-neutral-900 dark:border-neutral-900 ${textColor}`}
          >
            {projectName.charAt(0).toLocaleUpperCase()}
          </div>
        </>
      )}

      <div>
        <h3 className={cn(`${showIcons ? "mt-4" : "mt-0"} font-semibold`)}>
          {projectName}
        </h3>
        <p className="text-sm line-clamp-3">{projectDescription}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
