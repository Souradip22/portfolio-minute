import React from "react";
import { LinkWrapper } from "./LinkWrapper";
import { socialLinksSVGs } from "./social-links";

interface SocialLinkProps {
  label: string;
  value: string;
}

interface SocialLinksProps {
  socialLinks: SocialLinkProps[];
}
const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  return (
    <div className="flex gap-3 items-center ml-auto !my-2">
      {socialLinks.map((item, index) => (
        <SocialLink key={index} linkDetails={item} />
      ))}
    </div>
  );
};

const SocialLink: React.FC<{ linkDetails: SocialLinkProps }> = ({
  linkDetails,
}) => {
  const { label, value } = linkDetails;

  if (!value) return null;

  return (
    <LinkWrapper
      className="text-lg opacity-60 hover:opacity-100 !text-primary-500"
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
