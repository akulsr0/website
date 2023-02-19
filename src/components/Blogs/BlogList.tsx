import * as React from "react";
import { NextPage } from "next";
import { Blog } from "../../interfaces/Blog";
import BlogListItem from "./BlogListItem";
import defaults from "../../constants/default.json";
import { useTheme } from "../../context/ThemeContext";

const BLOGS_COUNT = defaults.blogs_count;

interface BlogsListProps {
  blogs: Array<Blog>;
}

const BlogsList: NextPage<BlogsListProps> = (props) => {
  const { isDarkTheme } = useTheme();
  const { blogs } = props;

  const [showViewMore, setShowViewMore] = React.useState(false);
  const [_blogs, setBlogs] = React.useState<Blog[]>([]);

  React.useEffect(() => {
    setBlogs(() => {
      const updatedBlogs = blogs.slice(0, BLOGS_COUNT);
      setShowViewMore(blogs.length > updatedBlogs.length);
      return updatedBlogs;
    });
  }, [blogs]);

  const blogsList = _blogs.map((b) => (
    <BlogListItem key={b.data.slug} blog={b} />
  ));

  function onClickViewMore() {
    const _newBlogs = blogs.slice(0, _blogs.length + BLOGS_COUNT);
    setBlogs(_newBlogs);
    if (_newBlogs.length >= blogs.length) setShowViewMore(false);
  }

  function ViewMore() {
    return showViewMore ? (
      <span
        onClick={onClickViewMore}
        style={{ color: isDarkTheme ? "#ced6e0" : "#3d3d3d" }}
      >
        View More
      </span>
    ) : null;
  }

  return (
    <>
      {blogsList}
      <ViewMore />
    </>
  );
};

export default BlogsList;
