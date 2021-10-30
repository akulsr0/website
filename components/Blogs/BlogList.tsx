import { NextPage } from "next";
import { Blog } from "../../interfaces/Blog";
import BlogListItem from "./BlogListItem";

interface BlogsListProps {
  blogs: Array<Blog>;
}

const BlogsList: NextPage<BlogsListProps> = (props) => {
  const { blogs } = props;
  const blogsList = blogs.map((b) => (
    <BlogListItem key={b.data.slug} blog={b} />
  ));

  return <>{blogsList}</>;
};

export default BlogsList;
