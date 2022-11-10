import { NextPage } from "next";
import fs from "fs";
import path from "path";

import { Blog } from "../../interfaces/Blog";
import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import BlogsList from "../../components/Blogs/BlogList";
import Footer from "../../components/Footer";
import styles from "../../styles/Blog.module.css";
import { useEffect, useState } from "react";

interface BlogsProps {
  blogsContent: Array<Blog>;
}

const CATEGORIES = ["all", "tech", "non-tech"];

const Blogs: NextPage<BlogsProps> = (props) => {
  const { blogsContent } = props;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogs, setBlogs] = useState<Array<Blog>>(blogsContent);

  useEffect(() => {
    switch (selectedCategory) {
      case "all":
        setBlogs(blogsContent);
        break;
      case "tech":
        const techBlogs = blogsContent.filter((b) => b.data.isTechBlog);
        setBlogs(techBlogs);
        break;
      case "non-tech":
        const nonTechBlogs = blogsContent.filter(
          (b) => b.data.isTechBlog === false
        );
        setBlogs(nonTechBlogs);
        break;
      default:
        setBlogs(blogsContent);
        break;
    }
  }, [selectedCategory]);

  return (
    <Container>
      <Head
        title="Blogs"
        metaDescription="I do write sometimes, you can find my blogs here."
      />
      <Header />
      <main className="main-content">
        <div className={styles.blogCategories}>
          {CATEGORIES.map((c) => (
            <span
              key={c}
              onClick={() => setSelectedCategory(c)}
              style={{
                textDecoration: selectedCategory === c ? "underline" : "none",
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <div className={styles.blogList} id="content">
          <BlogsList blogs={blogs} />
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const blogsData = fs.readFileSync(path.join("content/blogs.json"), "utf-8");
  const { blogs } = JSON.parse(blogsData);

  return { props: { blogsContent: blogs } };
}

export default Blogs;
