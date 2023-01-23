import "../styles/globals.css";
import React, { useEffect, useLayoutEffect } from "react";
import type { AppProps } from "next/app";
import { Source_Sans_Pro as Font } from "@next/font/google";
import Script from "next/script";
import { ThemeContextProvider, useTheme } from "../context/ThemeContext";

import "highlight.js/styles/base16/gruvbox-dark-hard.css";

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
        background-color: ${isDarkTheme ? "#222f3e" : "#fdfdfd"};
        color: ${isDarkTheme ? "#ced6e0" : "black"};
      }
      a {
        color: ${isDarkTheme ? "#7ed6df" : "#0459af"};
      }
      blockquote {
        background-color: ${isDarkTheme ? "#ced6e0" : "#f9f9f9"};
        border-left: 10px solid ${isDarkTheme ? "#8e8e8e" : "#ccc"};
      }
      th,
      td {
        border: 1px solid ${isDarkTheme ? "#40739e" : "black"};
        padding: 0 2rem;
      }
      code[class*="language-"],
      pre {
        margin: 0.6rem 0;
        border-radius: 0.4rem;
      }
      :not(pre) > code[class*="language-"],
      pre[class*="language-"] {
        background-color: ${isDarkTheme ? "#1e1e1e" : "#2c3e50"};
      }
      .command-option {
        background-color: ${isDarkTheme ? "#2a2a2a" : "#f3f3f3"};
        color: ${isDarkTheme ? "#f8f8f8" : "#3d3d3d"};
      }
      .list li::before {
        color: ${isDarkTheme ? "#7ed6df" : "#0459af"};
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
