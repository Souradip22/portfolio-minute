import React from "react";
import SocialLinks from "./SocialLinks";
import EmojiAnimator from "./EmojiAnimator";

export default function Footer({
  socialLinks,
  theme,
}: {
  socialLinks: any[];
  theme?: string;
}) {
  const borderColor = `border-${theme}-500`;
  return (
    <footer
      className={`w-708 mx-auto mb-0 items-center py-4 px-6 rounded-t-xl flex flex-row justify-between border border-dashed ${borderColor} border-b-0`}
    >
      <EmojiAnimator />
      <div className="prose">
        <SocialLinks
          socialLinks={socialLinks.slice(0, 5)}
          theme={theme as string}
        />
      </div>
    </footer>
  );
}
