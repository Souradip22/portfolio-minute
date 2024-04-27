import { GoogleSignInButton, SignOutButton } from "@/components/AuthButtons";
import { SparklesCore } from "@/components/Sparkles";
import { getSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiLink } from "react-icons/fi";
import logo from "@/public/logo/logo-no-background.svg";

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <header className="z-[10000] max-w-screen top-0 left-0 center fixed h-20 w-screen   ">
        <div className="flex flex-col md:flex-row h-16  w-3/4 md:w-2/4 items-center justify-between px-6  my-2 relative z-[10000] rounded-full mx-auto border border-[#eee2]">
          <a
            href="/"
            className="relative flex items-center h-full  space-x-2 group min-w-max "
          >
            <Image
              src={logo}
              width="40"
              height="40"
              alt="logo | portfolio minute"
            />

            <span className="text-md md:text-xl font-semibold text-cyan-500">
              Portfolio Minute
            </span>
          </a>
          <div className="flex items-center space-x-8 z-[10000]">
            <p className="text-gray-500 text-sm mt-0 sm:mt-1  mb-1">
              built by
              <a href="https://souradip.ch" target="_blank">
                <span className="border-b border-amber-400 mx-1">souradip</span>
                {/* <FiExternalLink className=" inline-block" /> */}
              </a>
            </p>
          </div>
        </div>
      </header>
      <div className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden h-screen">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.2}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="pt-6 px-8 relative z-40 ">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="z-50" style={{ opacity: "1" }}></div>
            <div className="z-50" style={{ opacity: 1 }}>
              <div>
                <h1
                  className="text-center text-3xl md:text-6xl mb-4 font-bold"
                  style={{
                    background: "linear-gradient(45deg, #00fbff, #FF4500)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Craft Your Stunning Portfolio
                  <br /> in Just One Minute!
                </h1>
                <div className="text-center font-medium text-base md:text-lg text-[#FFFFFF]/[.48] mb-8">
                  Create Your Online Portfolio Fast: Input Details, Get
                  Subdomain, Share!{" "}
                  <span className="opacity-1 shadow-md shadow-cyan-400">
                    Edit Anytime!
                  </span>
                  <br />
                </div>
              </div>
              <div className="w-full">
                <div className="flex md:flex-row flex-col space-x-0 space-y-4 md:space-y-0 items-center justify-center md:space-x-4 pb-20 w-full relative z-40">
                  {session ? (
                    <>
                      <Link
                        href={"/dashboard"}
                        className="group md:w-fit group w-fit flex justify-center relative rounded-full p-px text-[0.8125rem] font-semibold leading-6 shadow-xl shadow-zinc-950 text-white"
                      >
                        <span className="absolute inset-0 overflow-hidden rounded-lg">
                          <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                        </span>
                        <div className="relative z-10 w-full flex justify-center rounded-lg bg-[#3887FD] bg-opacity-50 hover:bg-opacity-60 transition py-3 px-6 ring-1 items-center space-x-2">
                          <span>Dashboard</span>
                        </div>
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 opacity-20 group-hover:opacity-80"></span>
                      </Link>

                      <SignOutButton />
                    </>
                  ) : (
                    <GoogleSignInButton />
                  )}
                </div>
              </div>
            </div>
            <div
              className="user-select-none user-drag-none w-full opacity-100 relative "
              style={{ transform: "none" }}
            >
              <video
                controls
                autoPlay
                width={600}
                height={400}
                className="border-2 border-cyan-500 shadow-[0_10px_20px_rgba(46,_228,_240,_0.7)] rounded-md z-20 overflow-hidden border-zinc-600/40 ThreeD mx-auto"
              >
                <source src="/intro.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
