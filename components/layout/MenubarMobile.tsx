import React from "react";
import { MdClose, MdMenu, MdOutlineSettings } from "react-icons/md";
export default function MenuBarMobile({
  show,
  setter,
}: {
  show: any;
  setter: any;
}) {
  return (
    <button
      className="md:hidden fixed bottom-[100px] left-2  shadow-2xl text-xl flex text-white rounded-xl bg-cyan-500 z-50 p-4"
      onClick={() => {
        setter((oldVal: any) => !oldVal);
      }}
    >
      {show ? (
        <MdClose className="w-8 h-8" />
      ) : (
        <MdOutlineSettings className=" w-8 h-8 animate-spin animate-spin-slow" />
      )}
    </button>
  );
}
