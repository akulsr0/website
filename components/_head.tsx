import type { NextPage } from "next";
import NextHead from "next/head";
import defaults from "../constants/default.json";
import { isProduction } from "../lib";

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
      <meta name="description" content={_metaDescription} />
      {isProduction() && (
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8438074706231459"
          crossOrigin="anonymous"
        ></script>
      )}
    </NextHead>
  );
};

export default Head;
