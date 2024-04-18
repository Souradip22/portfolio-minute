"use client";
import DomainPage from "@/app/domain/page";
import React, { useEffect, useState } from "react";
import FormSection from "./FormSection";
import { formDefaultValues } from "@/lib/defaultValues";

export default function EditorSection() {
  const [formValues, setFormValues] = useState({
    shortname: formDefaultValues.shortname,
    fullName: formDefaultValues.fullName,
    bio: formDefaultValues.bio,
    phone: formDefaultValues.phone,
    email: formDefaultValues.email,
    skills: formDefaultValues.skills,
    projects: formDefaultValues.projects,
    openToWork: formDefaultValues.isOpenToWork,
    completedProjects: formDefaultValues.completedProjects,
    experience: formDefaultValues.experience,
    eduExpValue: formDefaultValues.educationWithExperiences, // Corrected key name
    socialLinks: formDefaultValues.socialLinks,
    theme: formDefaultValues.theme,
    font: formDefaultValues.font,
  });

  // Function to update form field values
  const updateFormValues = (newValues: any) => {
    setFormValues({ ...formValues, ...newValues });
  };

  return (
    <div className="flex flex-row">
      <DomainPage formValues={formValues} />
      <FormSection
        formValues={formValues}
        updateFormValues={updateFormValues}
      />
    </div>
  );
}
