import * as React from "react";

const Comments = () => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    const attributes = {
      src: "https://giscus.app/client.js",
      "data-repo": "akulsr0/website",
      "data-repo-id": "R_kgDOGTSwPA",
      "data-category": "Content",
      "data-category-id": "DIC_kwDOGTSwPM4CR9JS",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "light",
      "data-lang": "en",
      "cross-origin": "anonymous",
      async: "true",
    };
    const script: HTMLScriptElement = document.createElement("script");
    Object.keys(attributes).forEach((attr) =>
      script.setAttribute(attr, attributes[attr as keyof typeof attributes])
    );
    ref.current?.appendChild(script);
  }, []);

  return <div ref={ref} id="giscus"></div>;
};

export default Comments;
