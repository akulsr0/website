import type { NextPage } from "next";
import NextHead from "next/head";
import defaults from "../constants/default.json";
import { useTheme } from "../context/ThemeContext";

const { name, meta_description } = defaults;

interface HeadProps {
  title?: string;
  metaDescription?: string;
  ogImage?: string;
  keywords?: Array<string>;
}

const Head: NextPage<HeadProps> = (props) => {
  const { isDarkTheme } = useTheme();
  const { title, metaDescription, ogImage, keywords } = props;

  const _title = title ? `${title} | ` : "";
  const finalTitle = `${_title}${name} - DevTips, Blogs, Learnings and more`;
  const _metaDescription = metaDescription || meta_description;
  const defaultKeywords =
    "akul srivastava, akul srivastava dev tips, akul srivastava blogs, akul srivastava learning,about akul srivastava, akul srivastava github, akulsr0, akul srivastava opensource";
  const keywordsString = keywords
    ? [...keywords, defaultKeywords].join(", ")
    : defaultKeywords;

  return (
    <NextHead>
      <title>{finalTitle}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <meta name="theme-color" content={isDarkTheme ? "#2a2a2a" : "#EEEEEE"} />
      <meta name="title" content="Akul Srivastava" />
      <meta name="keywords" content={keywordsString} />
      <meta name="description" content={_metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Akul Srivastava" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="robots" content="index, follow" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </NextHead>
  );
};

export default Head;
