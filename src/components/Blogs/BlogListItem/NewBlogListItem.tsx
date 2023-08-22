import { NextPage } from "next";
import Link from "next/link";
import { useTheme } from "../../../context/ThemeContext";
import { BlogListItemProps } from "../../../interfaces/Blog";
import styles from "../../../styles/Blog.module.css";

const NewBlogListItem: NextPage<BlogListItemProps> = (props) => {
  const { isDarkTheme } = useTheme();
  const { blog } = props;
  const [dd, mm, yyyy] = blog.data.date.split("-");
  return (
    <div className={styles.blogListItemWrapper}>
      <div>
        <span style={{ color: isDarkTheme ? "#bbb" : "#888" }}>
          {dd} {mm}
        </span>
        <span style={{ color: isDarkTheme ? "#aaa" : "#3d3d3d" }}>{yyyy}</span>
      </div>
      <div>
        <a href={`/blogs/${blog.data.slug}`}>{blog.data.title}</a>
      </div>
    </div>
  );
};

export default NewBlogListItem;
