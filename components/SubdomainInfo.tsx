import Link from "next/link";
import { useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

const SubdomainInfo = ({
  text,
  profilePresent,
}: {
  text: string;
  profilePresent: any;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const siteUrl = `${text}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
  };
  let buttonCls =
    "w-full mt-2 mx-auto relative flex h-10  items-center gap-2 rounded-2xl bg-white/5 pl-2 pr-3 text-xs text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none cursor-not-allowed z-[2]";
  if (profilePresent) {
    buttonCls =
      " w-full mt-2 mx-auto relative flex h-10  items-center gap-2 rounded-md bg-white/5 pl-2 pr-3 text-xs  ring-1  transition  ui-not-focus-visible:outline-none  text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 z-[2]";
  }
  return (
    // <div
    //   className="flex items-center justify-between
    //   bg-teal-900 text-teal-300 px-2.5 py-2 rounded-md text-sm shadow-md"
    // >
    //   <p className="text-lg font-bold">{siteUrl}</p>
    //   <div className="flex gap-2">
    //     <button
    //       onClick={handleCopy}
    //       className=" py-1 rounded-md flex items-center transition-colors "
    //     >
    //       {isCopied ? (
    //         <LuCopyCheck className="text-lg mr-1 " />
    //       ) : (
    //         <LuCopy className="text-lg mr-1" />
    //       )}
    //     </button>
    //     <Link
    //       href={`http://${siteUrl}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className=" py-1 rounded-md flex items-center"
    //     >
    //       <LuExternalLink className="text-lg mr-1" />
    //     </Link>
    //   </div>
    // </div>

    <div className="w-full">
      <button type="button" className={buttonCls}>
        <span className="ml-2">{siteUrl}</span>
        <span className=" flex gap-2 ml-auto p-1 text-sm text-cyan-400 ">
          {isCopied ? <LuCopyCheck /> : <LuCopy onClick={handleCopy} />}
          <Link
            href={`http://${siteUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${profilePresent ? "" : "cursor-not-allowed"}`}
          >
            <LuExternalLink />
          </Link>
        </span>
      </button>
      {!profilePresent && (
        <p className="text-xs text-gray-400 ml-2">
          <span className="text-red-500 ">*</span> your site will be activated
          when you save your changes
        </p>
      )}
    </div>
  );
};

export default SubdomainInfo;

{
  /* <button
        type="button"
        className="  
          }"
      ></button> */
  // dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20
}
