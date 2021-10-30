import { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Blog } from "../../interfaces/Blog";
import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import BlogsList from "../../components/Blogs/BlogList";
import Footer from "../../components/Footer";

interface BlogsProps {
  blogsContent: Array<Blog>;
}

const Blogs: NextPage<BlogsProps> = (props) => {
  const { blogsContent } = props;

  return (
    <Container>
      <Head title="Blogs" />
      <Header />
      <BlogsList blogs={blogsContent} />
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
