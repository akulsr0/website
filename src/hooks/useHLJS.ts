import hljs from "highlight.js";
import { useLayoutEffect } from "react";

export function useHighlightJS() {
  useLayoutEffect(() => {
    hljs.highlightAll();
  });
}
