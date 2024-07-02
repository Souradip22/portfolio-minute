"use client";
import clsx from "clsx";

import { FC, useEffect, useState } from "react";
import Image from "next/image";

export const FallbackImage: FC<any> = ({ src, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      alt={""}
      {...rest}
      src={imgSrc ? imgSrc : "/skills-fallback.png"}
      onError={() => {
        setImgSrc("/skills-fallback.png");
      }}
    />
  );
};
