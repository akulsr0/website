import type { NextPage } from "next";
import NextHead from "next/head";
import defaults from "../constants/default.json";

const { name, meta_description } = defaults;

interface HeadProps {
  title?: string;
  metaDescription?: string;
}

const Head: NextPage<HeadProps> = (props) => {
  const { title, metaDescription } = props;

  const _title = `${title ? `${title} | ` : ""}${name}`;
  const _metaDescription = metaDescription || meta_description;

  return (
    <NextHead>
      <title>{_title}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="theme-color" content="antiquewhite" />
      <meta name="description" content={_metaDescription} />
    </NextHead>
  );
};

export default Head;
