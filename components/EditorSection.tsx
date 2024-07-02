"use client";
import React, { useEffect, useState } from "react";
import { getProfile, getUser } from "@/lib/fetchers";
import { UsernameDialog } from "./UsernameDialog";
import EditProfileForm from "./EditProfileForm";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { z } from "zod";
import MenuBarMobile from "./layout/MenubarMobile";
import Sidebar from "./layout/Sidebar";
import ProfilePage from "./ProfilePage";
import { errorToast } from "@/lib/customToasts";
import Loader from "./Loader";
import { signOut } from "next-auth/react";

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
        if (!userResponse) {
          errorToast({
            title: "Your session has expired.",
            description:
              "Please sign in again. You will be automatically signed out in next 2 sec.",
          });
          setTimeout(() => {
            signOut();
          }, 3000);
        }
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
          <div className="overflow-y-auto sm:w-1/3 ">
            <div className="h-screen">
              <MenuBarMobile show={showSidebar} setter={setShowSidebar} />
              <Sidebar show={showSidebar} setter={setShowSidebar}>
                <EditProfileForm
                  profileDetails={profileDetails}
                  username={username}
                  updateProfileDetails={updateProfileDetails}
                />
              </Sidebar>
            </div>
          </div>
          <div className="relative overflow-y-auto  w-full sm:w-2/3">
            <div className="h-screen">
              <ProfilePage profileDetails={profileDetails} />
            </div>
          </div>
          {!username && (
            <UsernameDialog isOpen={true} setUsername={setUsername} />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
