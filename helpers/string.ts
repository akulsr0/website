export function getNameFromSlug(slug: string): string {
  return slug.replace(/-/g, " ");
}
