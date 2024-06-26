import React from "react";
import { LinkWrapper } from "./LinkWrapper";
import { socialLinksSVGs } from "./social-links";

interface SocialLinkProps {
  label: string;
  value: string;
  theme: string;
}

interface SocialLinksProps {
  socialLinks: SocialLinkProps[];
  theme: string;
}
const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks, theme }) => {
  return (
    <div className="flex flex-wrap gap-3 items-center ml-auto !my-2">
      {socialLinks.map((item, index) => (
        <SocialLink key={index} linkDetails={item} theme={theme} />
      ))}
    </div>
  );
};

const SocialLink: React.FC<{ linkDetails: SocialLinkProps; theme: string }> = ({
  linkDetails,
  theme,
}) => {
  const { label, value } = linkDetails;

  if (!value) return null;

  const textColor = `text-${theme}-500`;

  return (
    <LinkWrapper
      className={`text-lg opacity-80 hover:opacity-100 ${textColor} hover:scale-110`}
      href={value}
      key={label}
    >
      {label &&
        label.toLowerCase() in socialLinksSVGs &&
        socialLinksSVGs[label.toLowerCase()]}
    </LinkWrapper>
  );
};

export default SocialLinks;
