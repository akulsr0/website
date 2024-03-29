import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";

import Container from "../../../components/Container";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Head from "../../../components/_head";

import styles from "../../../styles/DevTips.module.css";

interface DevTipCategoryProps {
  category: string;
  tips: Array<string>;
}

const DevTipCategory: NextPage<DevTipCategoryProps> = (props) => {
  const { category, tips } = props;

  const Tips = (
    <ol reversed>
      {tips?.map((t) => (
        <li key={t}>
          <>
            &nbsp;
            <Link href={`/dev-tips/${category}/${t.toLowerCase()}`}>
              {t.split("-").join(" ")}
            </Link>
          </>
        </li>
      ))}
    </ol>
  );

  return (
    <Container>
      <Head
        title={`${category} DevTips`}
        metaDescription={`${category} tips | DevTips by Akul Srivastava`}
      />
      <Header />
      <main className="main-content">
        <div id="content">
          <h3 className={styles.devTipsTitle}>
            {category} tips ({tips?.length})
          </h3>
          {Tips}
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const category = ctx.params!.category;
  const tipsPath = path.join(`content/dev-tips/${category}`);
  const tips = fs
    .readdirSync(tipsPath)
    .map((tip) => tip.split("-").slice(1).join("-").replace(".md", ""))
    .reverse();

  return { props: { category, tips } };
}

export async function getStaticPaths() {
  const devTipsCategoriesPath = path.join("content/dev-tips");
  const devTipCategories = fs.readdirSync(devTipsCategoriesPath);
  const paths = devTipCategories.map((category) => {
    return { params: { category } };
  });

  return {
    paths,
    fallback: true,
  };
}

export default DevTipCategory;
