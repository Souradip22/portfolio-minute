import React from "react";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="relative flex py-5 items-center">
      <div className="flex sm:hidden flex-grow border-t border-primary-400 border-dotted"></div>
      <span className="flex-shrink mx-4  sm:ml-0">{title}</span>
      <div className="flex-grow border-t border-primary-400 border-dotted"></div>
    </div>
  );
}
