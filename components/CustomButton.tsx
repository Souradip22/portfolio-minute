import React from "react";

export default function CustomButton(props: any) {
  const type = props.type || "submit";
  const title = props.title;
  const isLoading = props.isLoading || false;
  return (
    <button
      type={type}
      className="group relative rounded-md p-px text-[0.8125rem] font-semibold leading-6 shadow-xl shadow-zinc-950 text-white"
    >
      <span className="absolute inset-0 overflow-hidden rounded-md">
        <span className="absolute inset-0 rounded-md bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className="relative z-10 rounded-md bg-gradient-to-b from-zinc-800 to-zinc-900 py-1 px-4 ring-1 ring-white/10 flex items-center space-x-2">
        <span className="flex gap-2">
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4 mt-1 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {title}
        </span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </button>
  );
}
