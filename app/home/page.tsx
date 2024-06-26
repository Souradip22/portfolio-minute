import { GoogleSignInButton, SignOutButton } from "@/components/AuthButtons";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import FAQ from "@/components/FAQ";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="bg-neutral-900">
      <HomeHeader />

      <section className="mx-auto flex max-w-4xl flex-col gap-2 p-8 relative text-gray-100 pb-16 2xl:pt-14">
        <div className="flex justify-center">
          {session ? (
            <div className="flex gap-2">
              <Link
                href={"/dashboard"}
                className="bg-neutral-50 rounded text-neutral-800 h-10 px-4 py-2 font-semibold "
              >
                Dashboard
              </Link>

              <SignOutButton />
            </div>
          ) : (
            <GoogleSignInButton />
          )}
        </div>
        <div className="user-select-none user-drag-none my-12 border-1 mx-auto border-green-500 rounded-md shadow-[0_0_5px_rgb(34,197,92),_0_0_10px_rgb(21,128,61)]">
          <video controls autoPlay className="rounded-md">
            <source src="/main.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <FAQ />
      </section>
    </div>
  );
}
