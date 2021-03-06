import { NextPage, GetStaticPropsContext } from "next";
import { useEffect, useRef } from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import readingTime from "reading-time";
import matter from "gray-matter";
import marked from "marked";

import {
  Blog as BlogType,
  BlogData,
  BlogRecommended,
} from "../../interfaces/Blog";
import styles from "../../styles/Blog.module.css";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getNameFromSlug, getRecommendedBlog } from "../../helpers";

interface BlogProps {
  blog: BlogType;
  recommended: BlogRecommended;
}

const Blog: NextPage<BlogProps> = (props) => {
  const { blog, recommended } = props;
  const [dd, mm, yyyy] = props.blog.data.date.split("-");
  const blogContentRef = useRef<HTMLDivElement>(null);
  const readTime = readingTime(blog.content);
  const blogHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const blogContentMarkup = marked(blog.content);
    blogContentRef.current &&
      (blogContentRef.current.innerHTML = blogContentMarkup);
    blogHeadingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [blog]);

  function getRecommendedBlogLink(blog: BlogData, title: string) {
    return (
      <div>
        <strong>{title}</strong>
        <Link href={`/blogs/${blog.slug}`}>{getNameFromSlug(blog.slug)}</Link>
      </div>
    );
  }

  return (
    <Container>
      <Head title={blog.data.title} metaDescription={blog.data.description} />
      <Header />
      <br />
      <>
        <h2 ref={blogHeadingRef}>{blog.data.title}</h2>
        <span className={styles.blogInfoLine}>
          {readTime.text} &nbsp;&bull;&nbsp; {`${dd} ${mm} ${yyyy}`}
        </span>
      </>
      <div
        id="content"
        ref={blogContentRef}
        className={styles.blogContent}
      ></div>
      <div className={styles.recommendedBlog}>
        {recommended.prev &&
          getRecommendedBlogLink(recommended.prev.data, "Previous")}
        {recommended.next &&
          getRecommendedBlogLink(recommended.next.data, "Next")}
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

  const { blogs: _blogs } = JSON.parse(
    fs.readFileSync(path.join("content/blogs.json"), "utf-8")
  );
  const recommended = getRecommendedBlog(_blogs, blog);

  return {
    props: {
      blog: {
        data,
        content,
      },
      recommended,
    },
  };
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
