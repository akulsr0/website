import React from "react";
import defaults from "../../constants/default.json";

export function AdsenseScript() {
  if (!defaults.adsConfig.adsense) return null;

  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3250999583463729"
      crossOrigin="anonymous"
    />
  );
}
