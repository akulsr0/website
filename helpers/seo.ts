import { isProduction } from "../lib";

export function getOGImageURL(title: string, contentType: string | undefined) {
  const shrinkedTitle = encodeURI(
    title.length > 55 ? title.substring(0, 50) + "..." : title
  );
  const footer = contentType
    ? encodeURI(`${contentType} by Akul Srivastava`)
    : "";

  const host = isProduction()
    ? "https://akulsrivastava.com"
    : "http://local.akulsrivastava.com";

  const url = `${host}/api/og?title=${shrinkedTitle}&footer=${footer}`;

  return url;
}
