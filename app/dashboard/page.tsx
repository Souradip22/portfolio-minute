import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import EditorSection from "@/components/EditorSection";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return <EditorSection />;
}
