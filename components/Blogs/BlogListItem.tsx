import { NextPage } from "next";
import Link from "next/link";
import { Blog } from "../../interfaces/Blog";
import styles from "../../styles/Blog.module.css";

interface BlogListItemProps {
  blog: Blog;
}

const BlogListItem: NextPage<BlogListItemProps> = (props) => {
  const { blog } = props;

  return (
    <div className={styles.blogListItem}>
      <div>
        <Link href={`/blogs/${blog.data.slug}`} passHref>
          <h3>{blog.data.title}</h3>
        </Link>
        <span>{blog.data.date}</span>
      </div>
      <p>{blog.data.description}</p>
    </div>
  );
};

export default BlogListItem;
