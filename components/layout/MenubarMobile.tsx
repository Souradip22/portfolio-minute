import React from "react";
import { MdClose, MdMenu } from "react-icons/md";
export default function MenuBarMobile({
  show,
  setter,
}: {
  show: any;
  setter: any;
}) {
  return (
    <button
      className="md:hidden fixed bottom-[100px] left-2  shadow-lg text-xl flex text-white rounded-md bg-indigo-600 z-50 p-4"
      onClick={() => {
        setter((oldVal: any) => !oldVal);
      }}
    >
      {show ? <MdClose /> : <MdMenu />}
    </button>
  );
}
