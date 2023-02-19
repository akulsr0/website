import { GetStaticPropsContext } from "next";
import fs from "fs";
import matter from "gray-matter";
import marked from "marked";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface IYearInReviewProps {
  year: string;
  content: string;
}

const YearInReview = (props: IYearInReviewProps) => {
  const { year, content } = props;

  return (
    <Container>
      <Head title={`${year} in review`} />
      <Header />
      <article
        className="main-content"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></article>
      <Footer />
    </Container>
  );
};

export function getStaticPaths() {
  const paths = fs
    .readdirSync("content/year-in-review")
    .filter((y) => y.endsWith(".md"))
    .map((y) => ({ params: { year: y.split(".md")[0] } }));

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps(ctx: GetStaticPropsContext) {
  const yearParam = ctx.params!.year;
  const rawContent = fs.readFileSync(
    `content/year-in-review/${yearParam}.md`,
    "utf-8"
  );
  const { content } = matter(rawContent);
  return {
    props: {
      year: yearParam,
      content: marked(content),
    },
  };
}

export default YearInReview;
