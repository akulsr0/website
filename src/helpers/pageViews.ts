const VISITOR_BADGE_HOST = "https://akulsr0-visitor-badge.glitch.me";

export type ContentType = "blog" | "dev-tip";

export function getPageViewsImgUrl(type: ContentType, slug: string) {
  return `${VISITOR_BADGE_HOST}/badge?page_id=akulsr0.${type}.${slug}&left_text=Views`;
}
