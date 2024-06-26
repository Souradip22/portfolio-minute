import React from "react";

export default function SectionHeader({
  title,
  theme,
}: {
  title: string;
  theme?: string;
}) {
  const borderColor = `border-${theme}-500`;
  return (
    <div className="relative flex py-5 items-center">
      <div
        className={`flex sm:hidden flex-grow border-t ${borderColor} border-dotted`}
      ></div>
      <span className="flex-shrink mx-4 font-bold sm:ml-0">{title}</span>
      <div className={`flex-grow border-t ${borderColor} border-dotted`}></div>
    </div>
  );
}
