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
import Loader from "./Loader";

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
        <ProfilePage profileDetails={profileDetails} />
      ) : (
        // <div className="flex">
        //   {/* <MenuBarMobile show={showSidebar} setter={setShowSidebar} />
        //   <Sidebar show={showSidebar} setter={setShowSidebar}>
        //     <EditProfileForm
        //       profileDetails={profileDetails}
        //       username={username}
        //       updateProfileDetails={updateProfileDetails}
        //     />
        //   </Sidebar> */}
        //   <ProfilePage profileDetails={profileDetails} />
        //   {!username && (
        //     <UsernameDialog isOpen={true} setUsername={setUsername} />
        //   )}
        // </div>
        <Loader />
      )}
    </>
  );
}
