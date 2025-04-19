import React, { createContext, useContext, useState } from "react";

const DEFAULT_THEME = "light";

type ThemeMode = "light" | "dark";
type Theme = {
  theme: ThemeMode;
  setTheme?: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

export const ThemeContext = createContext<Theme>({ theme: DEFAULT_THEME });

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isLightTheme = theme === "light";
  const isDarkTheme = theme === "dark";
  const setLightTheme = () => {
    localStorage.setItem("theme", "light");
    setTheme!("light");
  };
  const setDarkTheme = () => {
    localStorage.setItem("theme", "dark");
    setTheme!("dark");
  };
  const toggleTheme = () => {
    isDarkTheme ? setLightTheme() : setDarkTheme();
  };
  const result = {
    theme,
    isLightTheme,
    isDarkTheme,
    setLightTheme,
    setDarkTheme,
    toggleTheme,
  };
  return result;
};
