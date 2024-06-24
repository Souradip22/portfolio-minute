import React, { useEffect, useState } from "react";
import { socialLinksSVGs } from "./social-links";
import SocialLinks from "./SocialLinks";
import EmojiAnimator from "./EmojiAnimator";

export default function Footer({ socialLinks }: { socialLinks?: any }) {
  return (
    <footer className="w-708 mx-auto mb-0 items-center py-4 px-6 rounded-t-xl flex flex-row justify-between border border-dashed border-primary-300 border-b-0 ">
      <EmojiAnimator />
      <div className="prose">
        <SocialLinks socialLinks={socialLinks} />
      </div>
    </footer>
  );
}
