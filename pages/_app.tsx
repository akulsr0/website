import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import marked from "marked";
import prism from "prismjs";
import "../styles/CodeHighlighting.css";

function MyApp({ Component, pageProps }: AppProps) {
  marked.setOptions({
    highlight: (code, lang) => {
      if (prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang);
      }
      return prism.highlight(code, prism.languages.plaintext, lang);
    },
  });
  return (
    <>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
