import Link from "next/link";
import { useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

const SubdomainInfo = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const siteUrl = `${text}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <div
      className="flex items-center justify-between 
      bg-teal-900 text-teal-300 px-2.5 py-2 rounded-md text-sm shadow-md"
    >
      <p className="text-lg font-bold">{siteUrl}</p>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className=" py-1 rounded-md flex items-center transition-colors "
        >
          {isCopied ? (
            <LuCopyCheck className="text-lg mr-1 " />
          ) : (
            <LuCopy className="text-lg mr-1" />
          )}
        </button>
        <Link
          href={`http://${siteUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className=" py-1 rounded-md flex items-center"
        >
          <LuExternalLink className="text-lg mr-1" />
        </Link>
      </div>
    </div>
  );
};

export default SubdomainInfo;
