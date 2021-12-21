import { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Blog } from "../../interfaces/Blog";
import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import BlogsList from "../../components/Blogs/BlogList";
import NewsLetterForm from "../../components/NewsletterForm";
import Footer from "../../components/Footer";
import styles from "../../styles/Blog.module.css";
import { useEffect, useState } from "react";

interface BlogsProps {
  blogsContent: Array<Blog>;
}

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
      <Head title="Blogs" />
      <Header />
      <div className={styles.blogCategories}>
        <span onClick={() => setSelectedCategory("all")}>all</span>
        <span onClick={() => setSelectedCategory("tech")}>tech</span>
        <span onClick={() => setSelectedCategory("non-tech")}>non-tech</span>
      </div>
      <div id="content">
        <BlogsList blogs={blogs} />
      </div>
      <NewsLetterForm />
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const blogsPath = path.join("content/blogs");
  const blogs = fs.readdirSync(blogsPath);
  const blogsContent = blogs
    .map((blog) => {
      const blogContent = fs.readFileSync(path.join(blogsPath, blog));
      const { data, content } = matter(blogContent);
      return { data, content };
    })
    .reverse();
  return { props: { blogsContent } };
}

export default Blogs;
