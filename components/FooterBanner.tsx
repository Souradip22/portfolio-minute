import React from "react";
import { socialLinksSVGs } from "./social-links";
import Link from "next/link";

export default function FooterBanner() {
  return (
    <div className="mt-16 border-t border-gray-200 pt-10 flex flex-col md:flex-row md:justify-between ">
      <ul className="flex flex-wrap  gap-1 text-sm text-gray-500 items-center">
        Built by
        <Link href={"https://souradip.ch"} target="_blank">
          <span className="border-b border-amber-400">Souradip</span>
        </Link>
        <Link
          href={"https://www.linkedin.com/in/souradip-c-563962141/"}
          target="_blank"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 6.25C8.75 7.625 7.875 8.75 6.25 8.75C4.75 8.75 3.75 7.625 3.75 6.375C3.75 5 4.75 3.75 6.25 3.75C7.75 3.75 8.75 4.875 8.75 6.25ZM3.75 26.25H8.75V10H3.75V26.25ZM20.75 10.25C18.125 10.25 16.625 11.75 16 12.75H15.875L15.625 10.625H11.125C11.125 12 11.25 13.625 11.25 15.5V26.25H16.25V17.375C16.25 16.875 16.25 16.5 16.375 16.125C16.75 15.25 17.375 14.125 18.75 14.125C20.5 14.125 21.25 15.625 21.25 17.625V26.25H26.25V17C26.25 12.375 23.875 10.25 20.75 10.25Z"
              fill="#2867B2"
            ></path>
          </svg>
        </Link>
      </ul>

      <p className="text-gray-500 text-xs mt-1 md:mt-0 flex flex-wrap ">
        Please drop a mail
        <a href="mailto:souradip.chandra97@gmail.com" target="_blank">
          <span className="border-b border-amber-400 mx-1">here</span>
        </a>{" "}
        in case of an issue
      </p>
    </div>
  );
}
