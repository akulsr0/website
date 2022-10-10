import type { NextPage } from "next";
import NextHead from "next/head";
import defaults from "../constants/default.json";

const { name, meta_description } = defaults;

interface HeadProps {
  title?: string;
  metaDescription?: string;
  ogImage?: string;
}

const Head: NextPage<HeadProps> = (props) => {
  const { title, metaDescription, ogImage } = props;

  const _title = `${title ? `${title} | ` : ""}${name}`;
  const _metaDescription = metaDescription || meta_description;

  return (
    <NextHead>
      <title>{_title}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="theme-color" content="antiquewhite" />
      <meta name="description" content={_metaDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
    </NextHead>
  );
};

export default Head;
