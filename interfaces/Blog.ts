interface BlogData {
  title: string;
  description: string;
  slug: string;
  date: string;
}

interface Blog {
  data: BlogData;
  content: string;
}

export type { BlogData, Blog };
