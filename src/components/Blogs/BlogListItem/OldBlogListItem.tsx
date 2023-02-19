import { NextPage } from "next";
import Link from "next/link";
import { BlogListItemProps } from "../../../interfaces/Blog";
import styles from "../../../styles/Blog.module.css";

const OldBlogListItem: NextPage<BlogListItemProps> = (props) => {
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

export default OldBlogListItem;
