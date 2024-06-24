import Image from "next/image";

interface Skill {
  label: string;
  value: string;
}

const SkillsComponent: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <>
      {skills.map((item, index) => (
        <button
          key={`${index}-skill`}
          className={`flex flex-row font-bold gap-3 items-center px-4 py-2 rounded-full text-[14px] hover:-translate-y-0.5 transform transition duration-800 border border-neutral-200 dark:border-neutral-800 cursor-ne-resize`}
        >
          <div className="flex items-center justify-center w-6 h-6 overflow-hidden rounded-full">
            <Image
              src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${item.value}.svg`}
              alt={`${item.label}`}
              width={24}
              height={24}
              onError={(e) => {
                (e.target as HTMLImageElement).innerHTML = "✅"; // Hide the image if it fails to load
              }}
            />
          </div>
          {item.label}
        </button>
      ))}
    </>
  );
};

export default SkillsComponent;
