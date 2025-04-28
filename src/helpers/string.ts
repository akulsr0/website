import title from "title";

export function getNameFromSlug(slug: string): string {
  return slug.replace(/-/g, " ");
}

export function toTitleCase(str: string) {
  return title(str, { special: ["VSCode"] });
}
