import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LinkWrapper } from "./LinkWrapper";

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
          <strong>
            <LinkWrapper
              href="https://portfoliominute.in"
              className="flex items-center gap-1 not-prose text-neutral-400"
            >
              Portfolio Minute <ExternalLink size={14} />
            </LinkWrapper>
          </strong>{" "}
        </span>{" "}
      </span>
    </div>
  );
}
