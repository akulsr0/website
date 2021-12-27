import { NextPage, GetStaticPropsContext } from "next";
import { useEffect, useRef } from "react";
import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import matter from "gray-matter";
import marked from "marked";

import { Blog as BlogType } from "../../interfaces/Blog";
import styles from "../../styles/Blog.module.css";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface BlogProps {
  blog: BlogType;
}

const Blog: NextPage<BlogProps> = (props) => {
  const { blog } = props;
  const [dd, mm, yyyy] = blog.data.date.split("-");
  const blogContentRef = useRef<HTMLDivElement>(null);
  const readTime = readingTime(blog.content);

  useEffect(() => {
    const blogContentMarkup = marked(blog.content);
    blogContentRef.current &&
      (blogContentRef.current.innerHTML += blogContentMarkup);
  }, []);

  return (
    <Container>
      <Head title={blog.data.title} metaDescription={blog.data.description} />
      <Header />
      <div id="content" ref={blogContentRef} className={styles.blogContent}>
        <h2>{blog.data.title}</h2>
        <span className={styles.blogInfoLine}>
          {readTime.text} &nbsp;&bull;&nbsp; {`${mm} ${dd}, ${yyyy}`}
        </span>
        <br />
      </div>
      <Footer />
    </Container>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const blogsPath = path.join("content/blogs");
  const blogs = fs.readdirSync(blogsPath);
  const slug = ctx.params!.blog as string;
  const blog = blogs.find((b) => b.includes(slug))!;
  const blogContent = fs.readFileSync(path.join(blogsPath, blog), "utf-8");
  const { data, content } = matter(blogContent);
  return { props: { blog: { data, content } } };
}

export async function getStaticPaths() {
  const blogsPath = path.join("content/blogs");
  const blogs = fs.readdirSync(blogsPath);
  const paths = blogs.map((blog) => {
    return {
      params: {
        blog: blog.split("-").slice(1).join("-").replace(".md", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default Blog;
