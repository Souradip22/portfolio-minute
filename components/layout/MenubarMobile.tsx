import React from "react";
import { FiMenu as Icon } from "react-icons/fi";
export default function MenuBarMobile({ setter }: { setter: any }) {
  return (
    <button
      className="md:hidden fixed bottom-4 left-2 text-xl flex text-white rounded-full bg-indigo-600 z-50 p-4"
      onClick={() => {
        setter((oldVal: any) => !oldVal);
      }}
    >
      <Icon />
    </button>
  );
}
