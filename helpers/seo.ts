export function getOGImageURL(title: string, contentType: string | undefined) {
  const shrinkedTitle = encodeURI(
    title.length > 55 ? title.substring(0, 50) + "..." : title
  );
  const footer = contentType
    ? encodeURI(`${contentType} by Akul Srivastava`)
    : "";

  const url = `https://og-image.vercel.app/%3Cdiv%20style%3D%22display%3Aflex%3B%20flex-direction%3Acolumn%3B%22%3E%20%20%20%20%20%3Ch1%20style%3D%22margin%3A0%3B%20margin-bottom%3A2rem%3B%20fontSize%3A%2032px%22%3E${shrinkedTitle}%3C%2Fh1%3E%20%20%20%20%20%3Ci%3E${footer}%3C%2Fi%3E%20%3C%2Fdiv%3E.png?theme=dark&md=1&fontSize=50px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg&widths=0&heights=0`;

  return url;
}
