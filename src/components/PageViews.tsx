import React from "react";
import { useTheme } from "../context/ThemeContext";

function PageViews(props: { views: null | number }) {
  const { views } = props;
  const { isDarkTheme } = useTheme();

  return (
    <strong style={{ color: "#888", display: "flex", gap: "0.4rem" }}>
      <span>Views:</span>
      <span>{views}</span>
    </strong>
  );
}

export default PageViews;
