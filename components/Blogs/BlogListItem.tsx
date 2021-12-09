import { NextPage } from "next";
import Link from "next/link";
import { Blog } from "../../interfaces/Blog";
import styles from "../../styles/Blog.module.css";

interface BlogListItemProps {
  blog: Blog;
}

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

const NewBlogListItem: NextPage<BlogListItemProps> = (props) => {
  const { blog } = props;
  const [dd, mm, yyyy] = blog.data.date.split("-");
  return (
    <div className={styles.blogListItemWrapper}>
      <div>
        <span>
          {dd} {mm}
        </span>
        <span>{yyyy}</span>
      </div>
      <div>
        <Link href={`/blogs/${blog.data.slug}`} passHref>
          <a href="#">{blog.data.title}</a>
        </Link>
      </div>
    </div>
  );
};

const BlogListItem: NextPage<BlogListItemProps> = (props) => {
  const { blog } = props;
  const isNewBlogListItem = true;

  if (isNewBlogListItem) return <NewBlogListItem blog={blog} />;
  return <OldBlogListItem blog={blog} />;
};

export default BlogListItem;
