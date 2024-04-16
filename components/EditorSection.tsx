"use client";
import DomainPage from "@/app/domain/page";
import React, { useState } from "react";
import FormSection from "./FormSection";

export default function EditorSection() {
  const [formValues, setFormValues] = useState({
    shortname: "",
    fullname: "",
    bio: "",
    phone: "",
    email: "",
    skills: "",
    projects: "",
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
