import { NextPage, GetStaticPropsContext } from "next";
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

import { useTheme } from "../../context/ThemeContext";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageViews from "../../components/PageViews";
import ShareButtons from "../../components/SocialShareButtons";
import Comments from "../../components/Comments";

import {
  getBlogLink,
  getNameFromSlug,
  getRecommendedBlog,
} from "../../helpers";
import { getOGImageURL } from "../../helpers/seo";

import styles from "../../styles/Blog.module.css";

interface BlogProps {
  blog: BlogType;
  recommended: BlogRecommended;
}

const Blog: NextPage<BlogProps> = (props) => {
  const { blog, recommended } = props;
  const { isDarkTheme } = useTheme();
  const { slug } = blog.data;
  const [dd, mm, yyyy] = props.blog.data.date.split("-");
  const readTime = readingTime(blog.content);

  function getRecommendedBlogLink(blog: BlogData, title: string) {
    return (
      <div>
        <strong>{title}</strong>
        <Link href={`/blogs/${blog.slug}`}>{getNameFromSlug(blog.slug)}</Link>
      </div>
    );
  }

  const ogImageUrl = getOGImageURL(blog.data.title, "Blog");

  return (
    <Container>
      <Head
        title={blog.data.title}
        metaDescription={blog.data.description}
        ogImage={ogImageUrl}
      />
      <Header />
      <article className="main-content">
        <>
          <h1>{blog.data.title}</h1>
          <span
            className={styles.blogInfoLine}
            style={{
              color: isDarkTheme ? "#ced6e0aa" : "#595959",
            }}
          >
            {readTime.text} &nbsp;&bull;&nbsp; {`${dd} ${mm} ${yyyy}`}
          </span>
        </>
        <div className={styles.blogViewShareWrapper}>
          {/* eslint-disable @next/next/no-img-element */}
          <PageViews type="blog" slug={slug} />
          <ShareButtons url={getBlogLink(slug)} />
        </div>
        <div
          id="content"
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <Comments />
        <div className={styles.recommendedBlog}>
          {recommended.prev &&
            getRecommendedBlogLink(recommended.prev.data, "Previous")}
          {recommended.next &&
            getRecommendedBlogLink(recommended.next.data, "Next")}
        </div>
      </article>
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
        content: marked(content),
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
