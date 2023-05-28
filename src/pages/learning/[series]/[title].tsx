import * as React from "react";
import fs from "fs";
import path from "path";
import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import matter from "gray-matter";
import marked from "marked";

import Container from "../../../components/Container";
import Head from "../../../components/_head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ILearning, ILearningRecommended } from "../../../interfaces/Learning";
import { getNameFromSlug } from "../../../helpers";
import { useHighlightJS } from "../../../hooks/useHLJS";

import {
  getLearningLink,
  getRecommendedLearningContent,
} from "../../../helpers/learning";
import Comments from "../../../components/Comments";
import ShareButtons from "../../../components/SocialShareButtons";
import { useTheme } from "../../../context/ThemeContext";
import { usePageViews } from "../../../lib/supabase";
import PageViews from "../../../components/PageViews";

import styles from "../../../styles/Learning.module.css";
import { ContentType } from "../../../constants/content";

interface ILearningContentPageProps {
  series: string;
  title: string;
  slug: string;
  content: string;
  data: Record<string, string | number>;
  recommended: ILearningRecommended;
}

const LearningContentPage: NextPage<ILearningContentPageProps> = (props) => {
  const { series, content, slug, data, recommended, title } = props;
  const { isDarkTheme } = useTheme();
  useHighlightJS();
  const seriesTitle = getNameFromSlug(series);

  const views = usePageViews({
    category: series,
    slug,
    path: `/learning/${series}/${slug}`,
    url: `https://akulsrivastava.com/learning/${series}/${slug}`,
    date: new Date(data.date),
    type: ContentType.learning,
  });

  function getRecommendedTipLink(lc: string, title: string) {
    return (
      <div>
        <strong>{title}</strong>
        <Link href={`/learning/${series}/${lc}`}>{getNameFromSlug(lc)}</Link>
      </div>
    );
  }

  return (
    <Container>
      <Head
        title={title}
        metaDescription={`${title} | Sharing learning of ${title} here.`}
      />
      <Header />
      <article className="main-content">
        <Link href={`/learning/${series}`} passHref>
          <h2
            className={styles.pointer}
            style={{ color: isDarkTheme ? "#ced6e0" : "#3d3d3d" }}
          >
            &#8592;&nbsp;&nbsp;{seriesTitle}
          </h2>
        </Link>
        <div className={styles.flexRow}>
          <PageViews views={views} />
          <ShareButtons url={getLearningLink(series, title)} />
        </div>
        <div
          className={`${styles.mt1} ${styles.flexColumn}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Comments />
        <div className={styles.recommended}>
          {recommended.prev &&
            getRecommendedTipLink(recommended.prev, "Previous")}
          {recommended.next && getRecommendedTipLink(recommended.next, "Next")}
        </div>
      </article>
      <Footer />
    </Container>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const series = ctx.params!.series as string;
  const title = ctx.params!.title as string;

  const learningContent = JSON.parse(
    fs.readFileSync(path.resolve("content/learning.json"), "utf-8")
  );
  const seriesContent = learningContent.find(
    (c: ILearning) => c.slug === series
  );
  const fileTitle = seriesContent.children.find((f: string) =>
    f.match(`${title}.md`)
  );
  const rawContent = fs.readFileSync(
    path.resolve(`content/learning/${series}/${fileTitle}`),
    "utf-8"
  );
  const { content, data } = matter(rawContent);

  const recommended = getRecommendedLearningContent(
    seriesContent.children,
    fileTitle
  );

  return {
    props: {
      series,
      slug: title,
      title: title.split("-").join(" "),
      content: marked(content),
      data,
      recommended,
    },
  };
}

export default LearningContentPage;
