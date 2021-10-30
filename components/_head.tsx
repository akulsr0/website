import type { NextPage } from "next";
import NextHead from "next/head";
import { name, meta_description } from "../constants/default.json";

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
      <meta name="description" content={_metaDescription} />
    </NextHead>
  );
};

export default Head;
