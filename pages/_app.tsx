import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Source_Sans_Pro as Font } from "@next/font/google";
import Script from "next/script";
import marked from "marked";
import prism from "prismjs";
import { ThemeContextProvider, useTheme } from "../context/ThemeContext";
import "../styles/CodeHighlighting.css";
import React, { useLayoutEffect } from "react";

const font = Font({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  fallback: ["sans-serif"],
  display: "swap",
});

const ThemeStyle = () => {
  const { isDarkTheme } = useTheme();
  return (
    <style jsx global>{`
      html {
        font-family: ${font.style.fontFamily};
      }
      body {
        background-color: ${isDarkTheme ? "#3d3d3d" : "#fdfdfd"};
        color: ${isDarkTheme ? "#f8f8f8" : "black"};
      }
      a {
        color: ${isDarkTheme ? "#F8EFBA" : "#0459af"};
      }
      blockquote {
        background-color: ${isDarkTheme ? "#a59f8f" : "#f9f9f9"};
        border-left: 10px solid ${isDarkTheme ? "#9b9786" : "#ccc"};
      }
      th,
      td {
        border: 1px solid ${isDarkTheme ? "#9b9786" : "black"};
        padding: 0 2rem;
      }
      code[class*="language-"],
      pre {
        background-color: ${isDarkTheme ? "#2a2a2a" : "#2c3e50"};
      }
      :not(pre) > code[class*="language-"],
      pre[class*="language-"] {
        background-color: ${isDarkTheme ? "#2a2a2a" : "#2c3e50"};
      }
      .command-option {
        background-color: ${isDarkTheme ? "#2a2a2a" : "#f3f3f3"};
        color: ${isDarkTheme ? "#f8f8f8" : "#3d3d3d"};
      }
      .list li::before {
        color: ${isDarkTheme ? "#a59f8f" : "#0459af"};
      }
    `}</style>
  );
};

const ThemeSetter = ({ children }: { children: any }) => {
  const { setLightTheme, setDarkTheme } = useTheme();

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const isDeviceDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if ((!localTheme && isDeviceDarkMode) || localTheme === "dark") {
      setDarkTheme();
    }
    if (localTheme === "light") setLightTheme();
  }, []);

  return children;
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
    <>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <ThemeContextProvider>
        <ThemeSetter>
          <ThemeStyle />
          <Component {...pageProps} />
        </ThemeSetter>
      </ThemeContextProvider>
    </>
  );
}
export default MyApp;
