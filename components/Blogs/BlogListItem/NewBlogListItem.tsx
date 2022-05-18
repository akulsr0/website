import { NextPage } from "next";
import Link from "next/link";
import { BlogListItemProps } from "../../../interfaces/Blog";
import styles from "../../../styles/Blog.module.css";

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

export default NewBlogListItem;
