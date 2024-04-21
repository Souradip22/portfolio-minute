"use client";
import DomainPage from "@/app/domain/page";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FormSection from "./FormSection";
import { profileFormDefaultValues } from "@/lib/defaultValues";
import useSWR from "swr";
import fetcher, { getProfile, getUser } from "@/lib/fetchers";
import { UsernameDialog } from "./UsernameDialog";
import EditProfileForm from "./EditProfileForm";
import { profileSchema } from "@/schemas/ProfileFormSchema";
import { z } from "zod";

type TSProfileSchema = z.infer<typeof profileSchema>;

export default function EditorSection() {
  // const [formValues, setFormValues] = useState({});
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [profileDetails, setProfileDetails] = useState<TSProfileSchema | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUser();
        console.log("FETCH RESULT ARRIVED for Users");
        setUsername(userResponse?.username || "");

        const profileResponse = await getProfile();
        console.log("FETCH RESULT ARRIVED for profile");
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
      }
    };

    fetchData();
  }, []);

  // Function to update form field values
  // const updateFormValues = (newValues: any) => {
  //   setProfileDetails({ ...profileDetails, ...newValues });
  // };
  const updateProfileDetails = (newProfileDetails: any) => {
    setProfileDetails(newProfileDetails);
  };

  return (
    <div className="flex flex-row">
      {mounted ? (
        <>
          <DomainPage profileDetails={profileDetails} />
          {/* <FormSection
            formValues={formValues}
            updateFormValues={updateFormValues}
            username={username || userInfo?.username}
          /> */}

          <EditProfileForm
            profileDetails={profileDetails}
            username={username}
            updateProfileDetails={updateProfileDetails} // Add this prop
          />
          {!username && (
            <UsernameDialog isOpen={true} setUsername={setUsername} />
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
