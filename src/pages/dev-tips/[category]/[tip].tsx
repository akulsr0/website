import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import path from "path";
import readingTime from "reading-time";

import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Head from "../../../components/_head";
import PageViews from "../../../components/PageViews";
import ShareButtons from "../../../components/SocialShareButtons";
import Comments from "../../../components/Comments";

import { IRecommendedTip } from "../../../interfaces/DevTips";
import {
  getDevTipLink,
  getNameFromSlug,
  getRecommendedDevTips,
  toTitleCase,
} from "../../../helpers";
import { getOGImageURL } from "../../../helpers/seo";
import { useHighlightJS } from "../../../hooks/useHLJS";
import { usePageViews } from "../../../lib/supabase";
import { ContentType } from "../../../constants/content";

import styles from "../../../styles/DevTips.module.css";

interface ITip {
  data: {
    title: string;
    keywords?: string;
    category: string;
    date: string;
    slug: string;
  };
  content: string;
  recommended: IRecommendedTip;
}

interface DevTipProps {
  tip: ITip;
}

const DevTip: NextPage<DevTipProps> = (props) => {
  useHighlightJS();
  const title = toTitleCase(props?.tip?.data.title) || "";
  const content = props?.tip?.content;
  const { category, slug } = props.tip.data;
  const [dd, mm, yyyy] = props?.tip?.data.date.split("-");
  const recommendedTips = props?.tip?.recommended;
  const readTime = readingTime(content);
  const keywords = (props.tip.data.keywords || "")
    .split(",")
    .map((kw) => kw.trim())
    .filter(Boolean);

  const views = usePageViews({
    category,
    slug,
    path: `/dev-tips/${category}/${slug}`,
    url: `https://akulsrivastava.com/dev-tips/${category}/${slug}`,
    date: new Date(props?.tip?.data.date),
    type: ContentType.devTip,
  });

  function getRecommendedTipLink(tip: Record<string, string>, title: string) {
    return (
      <div>
        <strong>{title}</strong>
        <Link href={`/dev-tips/${tip.category}/${tip.tip}`}>
          {getNameFromSlug(tip.tip)}
        </Link>
      </div>
    );
  }

  const ogImgUrl = getOGImageURL(title, "DevTip");

  return (
    <Container>
      <Head
        title={title}
        metaDescription={title}
        ogImage={ogImgUrl}
        keywords={keywords}
      />
      <Header />
      <article className="main-content">
        <div id="content">
          <h3 className={styles.devTipsTitle}>{title}</h3>
          <span className={styles.devTipInfoLine}>
            {readTime.text} &nbsp;&bull;&nbsp; {`${dd} ${mm} ${yyyy}`}
          </span>
          <div className={styles.devTipsViewShareWrapper}>
            <PageViews views={views} />
            <ShareButtons url={getDevTipLink(category, slug)} />
          </div>
          <div
            className={styles.tipContent}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <Comments />
          <div className={styles.recommendedTips}>
            {recommendedTips.prev &&
              getRecommendedTipLink(recommendedTips.prev, "Previous")}
            {recommendedTips.next &&
              getRecommendedTipLink(recommendedTips.next, "Next")}
          </div>
        </div>
      </article>
      <Footer />
    </Container>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const params = ctx.params!;
  const { category, tip } = params;

  const tipsPath = path.resolve(`content/dev-tips/${category}`);
  const tips = fs.readdirSync(tipsPath);
  const _tip = tips.find((b) => b.toLowerCase().includes(tip as string))!;
  const tipContent = fs.readFileSync(
    path.resolve(`content/dev-tips/${category}/${_tip}`),
    "utf-8"
  );

  const devTipsString = fs.readFileSync(
    path.resolve("content/devtips.json"),
    "utf-8"
  );
  const { devTips } = JSON.parse(devTipsString);
  const recommended = getRecommendedDevTips(devTips, tip as string);

  const { data, content } = matter(tipContent);

  return {
    props: {
      tip: {
        data: {
          ...data,
          slug: tip,
        },
        content: marked(content),
        recommended,
      },
    },
  };
}

export default DevTip;
