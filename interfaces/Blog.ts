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

export type { BlogData, Blog, BlogListItemProps };
