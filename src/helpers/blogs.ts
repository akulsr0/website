import { BlogRecommended, BlogData } from "../interfaces/Blog";

export function getRecommendedBlog(
  blogs: Array<{ data: BlogData }>,
  blog: string
): BlogRecommended {
  const recommended: BlogRecommended = {};
  for (let i = 0; i < blogs.length; i++) {
    const slug = blogs[i].data.slug;
    if (blog.includes(slug)) {
      if (i > 0) {
        recommended.prev = blogs[i - 1];
      }
      if (i < blogs.length - 1) {
        recommended.next = blogs[i + 1];
      }
    }
  }
  return recommended;
}

export function getBlogLink(slug: string) {
  return `https://akulsrivastava.com/blogs/${slug}`;
}
