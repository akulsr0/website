import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans as Font } from "@next/font/google";
import Script from "next/script";
import marked from "marked";
import prism from "prismjs";
import "../styles/CodeHighlighting.css";

const font = Font({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--default-font",
});

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
    <div className={[font.className, font.variable].join(" ")}>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
