export function getNameFromSlug(slug: string): string {
  return slug.replace(/-/g, " ");
}

export function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
