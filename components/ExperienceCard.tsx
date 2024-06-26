import { cn } from "@/lib/utils";
import { Factory, School } from "lucide-react";
import React from "react";

interface Experience {
  designation: string;
  fromDate: string;
  id: string;
  location: string;
  orgName: string;
  profileId: string;
  toDate: string;
  type: "school" | "factory";
}

interface ExperienceCardProps {
  expDetails: Experience;
  theme: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  expDetails,
  theme,
}) => {
  const { designation, fromDate, location, orgName, toDate, type } = expDetails;

  const textColor = `text-${theme}-500`;

  return (
    <article className="not-prose group p-4 flex border items-center gap-4 border-neutral-200 rounded-xl text-neutral-500 dark:bg-neutral-800 dark:border-neutral-800 dark:text-neutral-400">
      <div className="items-center">
        {type === "school" ? (
          <School className={`w-5 h-5 ${textColor}`} />
        ) : (
          <Factory className={`w-5 h-5 ${textColor}`} />
        )}
      </div>
      <div>
        <p className="text-xs italic">
          {fromDate} - {toDate}
        </p>
        <h3 className={cn(`mt-0 font-semibold`)}>
          {orgName}, {location}
        </h3>
        <p className="text-sm">{designation}</p>
      </div>
    </article>
  );
};

export default ExperienceCard;
