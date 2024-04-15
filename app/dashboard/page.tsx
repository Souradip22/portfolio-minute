import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormSection from "@/components/FormSection";
import PortfolioPage from "../domain/page";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  //   if (session) return redirect("/timeline");

  return (
    <div className="flex flex-row">
      <PortfolioPage />
      <FormSection />
    </div>
  );
}
