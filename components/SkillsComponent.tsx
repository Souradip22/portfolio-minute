import Image from "next/image";
import { FallbackImage } from "./FallbackImage";

interface Skill {
  label: string;
  value: string;
}

const SkillsComponent: React.FC<{ skills: Skill[]; theme: string }> = ({
  skills,
  theme,
}) => {
  return (
    <>
      {skills.map((item, index) => (
        <button
          key={`${index}-skill`}
          className={`flex group flex-row font-bold gap-3 items-center px-4 py-2 rounded-full text-[14px]  border border-dashed border-neutral-300 dark:border-neutral-600 cursor-ne-resize`}
        >
          <div className="flex items-center justify-center w-6 h-6 overflow-hidden rounded-full group-hover:scale-110 transform transition duration-800">
            <FallbackImage
              src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${item.value}.svg`}
              alt={`${item.label}`}
              width={24}
              height={24}
            />
          </div>
          {item.label}
        </button>
      ))}
    </>
  );
};

export default SkillsComponent;
