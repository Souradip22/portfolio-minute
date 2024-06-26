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
  const siteUrl = `${text}.portfoliominute.in`;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
  };
  let buttonCls =
    "w-full mt-2 mx-auto relative flex h-10  items-center gap-2 rounded-2xl bg-white/5 pl-2 pr-3 text-xs text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none cursor-not-allowed z-[2] pointer-events-none";
  if (profilePresent) {
    buttonCls =
      " w-full mt-2 mx-auto relative flex h-10  items-center gap-2 rounded-md bg-white/5 pl-2 pr-3 text-xs  ring-1  transition  ui-not-focus-visible:outline-none  text-zinc-400 ring-inset ring-white/10 hover:ring-white/20 z-[2]";
  }
  return (
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
