interface BlogData {
  title: string;
  description: string;
  slug: string;
  date: string;
  isTechBlog: boolean;
}

interface Blog {
  data: BlogData;
  content: string;
}

interface BlogListItemProps {
  blog: Blog;
}

interface BlogRecommended {
  prev?: { data: BlogData };
  next?: { data: BlogData };
}

export type { BlogData, Blog, BlogListItemProps, BlogRecommended };
