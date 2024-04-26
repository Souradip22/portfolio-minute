"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { profileFormDefaultValues } from "@/lib/defaultValues";
import useSWR from "swr";
import fetcher, { getProfile, getUser } from "@/lib/fetchers";
import { UsernameDialog } from "./UsernameDialog";
import EditProfileForm from "./EditProfileForm";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { z } from "zod";
import MenuBarMobile from "./layout/MenubarMobile";
import Sidebar from "./layout/Sidebar";
import ProfilePage from "./ProfilePage";
import { errorToast } from "@/lib/customToasts";

type TSProfileSchema = z.infer<typeof profileSchema>;

export default function EditorSection() {
  // const [formValues, setFormValues] = useState({});
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [profileDetails, setProfileDetails] = useState<TSProfileSchema | null>(
    null
  );
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUser();
        setUsername(userResponse?.username || "");

        const profileResponse = await getProfile();
        if (!profileResponse) {
          setProfileDetails(null);
        } else {
          setProfileDetails(profileResponse);
        }

        // Both async calls completed, setMounted to true
        setMounted(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsername("");
        setProfileDetails(null);
        setMounted(true);
        errorToast({
          title: "❌  Error fetching data ",
          description:
            "something went wrong server side, please try again later",
        });
      }
    };

    fetchData();
  }, []);

  const updateProfileDetails = (newProfileDetails: any) => {
    setProfileDetails(newProfileDetails);
  };

  return (
    <>
      {mounted ? (
        <div className="flex">
          <MenuBarMobile show={showSidebar} setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar}>
            <EditProfileForm
              profileDetails={profileDetails}
              username={username}
              updateProfileDetails={updateProfileDetails}
            />
          </Sidebar>
          <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
            <ProfilePage profileDetails={profileDetails} />
          </div>
          {!username && (
            <UsernameDialog isOpen={true} setUsername={setUsername} />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 fixed top-0 right-0 bottom-0 left-0 bg-gray-800  z-100 items-center text-white h-screen justify-center ">
          <svg
            className="animate-spin h-8 w-8 text-white mr-4"
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
          </svg>{" "}
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-1/2 text-center text-white">
            This may take a few seconds, please don&apos;t close this page.
          </p>
        </div>
      )}
    </>
  );
}
