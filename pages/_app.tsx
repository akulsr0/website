import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans as Font } from "@next/font/google";
import Script from "next/script";
import marked from "marked";
import prism from "prismjs";
import { ThemeContextProvider, useTheme } from "../context/ThemeContext";
import "../styles/CodeHighlighting.css";

const font = Font({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  fallback: ["sans-serif"],
  variable: "--default-font",
});

const ThemeStyle = () => {
  const { isDarkTheme } = useTheme();
  return (
    <style jsx global>{`
      body {
        background-color: ${isDarkTheme ? "#3d3d3d" : "#fdfdfd"};
        color: ${isDarkTheme ? "#f8f8f8" : "black"};
      }
      a {
        color: ${isDarkTheme ? "#66d9ef" : "auto"};
      }
      blockquote {
        background-color: ${isDarkTheme ? "#a59f8f" : "#f9f9f9"};
        border-left: 10px solid ${isDarkTheme ? "#9b9786" : "#ccc"};
      }
      code[class*="language-"],
      pre {
        background-color: ${isDarkTheme ? "#2a2a2a" : "#2c3e50"};
      }
      :not(pre) > code[class*="language-"],
      pre[class*="language-"] {
        background-color: ${isDarkTheme ? "#2a2a2a" : "#2c3e50"};
      }
    `}</style>
  );
};

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
      <ThemeContextProvider>
        <ThemeStyle />
        <Component {...pageProps} />
      </ThemeContextProvider>
    </div>
  );
}
export default MyApp;
