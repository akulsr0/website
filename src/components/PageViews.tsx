import React from "react";
import { ContentType, getPageViewsImgUrl } from "../helpers";
import { isProduction } from "../lib";

function PageViews(props: { type: ContentType; slug: string }) {
  const { type, slug } = props;
  const isProd = isProduction();

  if (!isProd) return null;

  return (
    <>
      {/* eslint-disable @next/next/no-img-element */}
      <img height={20} src={getPageViewsImgUrl(type, slug)} alt="view-count" />
    </>
  );
}

export default PageViews;
