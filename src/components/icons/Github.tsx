import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";

interface IGithub {
  style?: React.CSSProperties;
  asLink?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

const Github = (props: IGithub) => {
  const { style, asLink, href, target = "_blank" } = props;
  const { isDarkTheme } = useTheme();

  const icon = (
    <Image
      style={style}
      width={24}
      height={24}
      src={isDarkTheme ? "/assets/github-white.svg" : "/assets/github.svg"}
      alt="github"
      title="github"
    />
  );

  if (asLink && href) {
    return (
      <Link href={href} target={target}>
        {icon}
      </Link>
    );
  }

  return icon;
};

export default Github;
