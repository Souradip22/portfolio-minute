import React, { useEffect, useState } from "react";
import { socialLinksSVGs } from "./social-links";
import SocialLinks from "./SocialLinks";

export default function EmojiAnimator() {
  const [emoji, setEmoji] = useState("😭");

  useEffect(() => {
    const emojis = ["🪄", "❤️", "😊", "🎉", "🌟", "🍀"];

    const interval = setInterval(() => {
      const currentIndex = emojis.indexOf(emoji);
      const nextIndex = (currentIndex + 1) % emojis.length;
      setEmoji(emojis[nextIndex]);
    }, 1000);

    return () => clearInterval(interval);
  }, [emoji]);

  return (
    <div>
      <span className="text-sm">
        {" "}
        <span>
          {" "}
          Crafted with <span className="text-xs w-4 h-4">{emoji}</span> by{" "}
          <strong>Souradip</strong>{" "}
        </span>{" "}
      </span>
    </div>
  );
}
