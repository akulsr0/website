import "../styles/globals.css";
import type { AppProps } from "next/app";
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
  return <Component {...pageProps} />;
}
export default MyApp;
