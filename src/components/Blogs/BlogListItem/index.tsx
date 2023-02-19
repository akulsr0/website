import { NextPage } from "next";
import { BlogListItemProps } from "../../../interfaces/Blog";
import OldBlogListItem from "./OldBlogListItem";
import NewBlogListItem from "./NewBlogListItem";

const BlogListItem: NextPage<BlogListItemProps> = (props) => {
  const { blog } = props;
  const isNewBlogListItem = true;

  if (isNewBlogListItem) return <NewBlogListItem blog={blog} />;
  return <OldBlogListItem blog={blog} />;
};

export default BlogListItem;
