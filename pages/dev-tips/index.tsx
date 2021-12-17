import { NextPage } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import NewsLetterForm from "../../components/NewsletterForm";
import Footer from "../../components/Footer";

import styles from "../../styles/DevTips.module.css";

interface DevTipsProps {
  contents: Array<string>;
  devTips: Array<Record<string, string>>;
}

const DevTips: NextPage<DevTipsProps> = (props) => {
  const { contents, devTips } = props;

  const DevTipsCategories = contents.map((c) => (
    <span key={c}>
      <Link href={`/dev-tips/${c}`}>{c}</Link>
    </span>
  ));

  const DevTipsList = devTips.map(({ category, tip }) => (
    <li key={tip}>
      <Link href={`/dev-tips/${category}/${tip}`}>
        {tip.split("-").join(" ")}
      </Link>
    </li>
  ));

  return (
    <Container>
      <Head title="Dev Tips" />
      <Header />
      <h3 className={styles.devTipsTitle}>Dev Tips</h3>
      <div className={styles.devTipsCategories}>{DevTipsCategories}</div>
      <blockquote className={styles.devTipsTagline}>
        New DevTips every weekend.
      </blockquote>
      <ul className={styles.devTipsList}>{DevTipsList}</ul>
      <NewsLetterForm />
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const contentPath = path.join("content/dev-tips");
  const contents = fs.readdirSync(contentPath);
  const devTips: Array<Record<string, string>> = [];
  for (let content of contents) {
    const _cPath = path.join(contentPath, content);
    const _devTips = fs.readdirSync(_cPath);
    _devTips.forEach((tip) => {
      devTips.push({
        category: content,
        tip: tip.split("-").slice(1).join("-").replace(/.md/, ""),
      });
    });
  }

  devTips.sort((a, b) =>
    a.tip.toLowerCase().localeCompare(b.tip.toLowerCase())
  );

  return {
    props: {
      contents: contents.sort(),
      devTips: devTips,
    },
  };
}

export default DevTips;
