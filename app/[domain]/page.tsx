import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getProfileForSite, getSiteData } from "@/lib/fetchers";
import ProfilePage from "@/components/ProfilePage";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);

  const profileData = await getProfileForSite(domain);
  if (!profileData) {
    return null;
  }
  let title = profileData?.fullName || domain;
  const description = profileData?.bio;
  title += " | Portfolio";
  return {
    title,
    description,
    openGraph: {
      title: title,
      description: description,
    },
  };
}
export async function generateStaticParams() {
  const allSites = await prisma.site.findMany({
    select: {
      subdomain: true,
    },
  });
  const allPaths = allSites
    .flatMap(({ subdomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
    ])
    .filter(Boolean);
  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, profile] = await Promise.all([
    getSiteData(domain),
    getProfileForSite(domain),
  ]);

  if (!data) {
    // notFound();
    redirect("https://portfoliominute.in");
  }

  const theme = profile?.theme;
  return <ProfilePage profileDetails={profile} />;
}
