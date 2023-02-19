import React from "react";
import { useTheme } from "../context/ThemeContext";

function PageViews(props: { views: null | number }) {
  const { views } = props;
  const { isDarkTheme } = useTheme();

  return (
    <strong
      style={{
        color: isDarkTheme ? "#ced6e0aa" : "#595959",
      }}
    >
      Views: {views}
    </strong>
  );
}

export default PageViews;
