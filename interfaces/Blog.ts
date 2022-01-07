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

export type { BlogData, Blog };
