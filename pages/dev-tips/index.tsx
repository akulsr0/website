import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

  const [tips, setTips] = React.useState(devTips);

  const DevTipsCategories = contents.map((c) => (
    <span key={c}>
      <Link href={`/dev-tips/${c}`}>{c}</Link>
    </span>
  ));

  const DevTipsList = tips.map(({ category, date, tip }) => {
    const [dd, mm, yyyy] = date.split("-");
    return (
      <div key={tip}>
        <span>{`${mm} ${dd}, ${yyyy}`}</span>
        {"-"}
        <Link href={`/dev-tips/${category}/${tip}`}>
          {tip.split("-").join(" ")}
        </Link>
      </div>
    );
  });

  function onSearchDevTip(event: React.ChangeEvent<HTMLInputElement>) {
    const searchText = event.target.value;
    if (!searchText) setTips(devTips);
    const searchKeywords = searchText.split(" ");
    const searchedTips = devTips.filter(({ tip }) => {
      let result = false;
      searchKeywords.forEach((keyword) => {
        if (tip.toLowerCase().includes(keyword.toLowerCase())) result = true;
      });
      return result;
    });
    setTips(searchedTips);
  }

  return (
    <Container>
      <Head
        title="Dev Tips"
        metaDescription="I share useful development tips here."
      />
      <Header />
      <h3 className={styles.devTipsTitle}>Dev Tips</h3>
      <div className={styles.devTipsCategories}>{DevTipsCategories}</div>
      <div id="content">
        <blockquote className={styles.devTipsTagline}>
          Bookmark this place for development tips.
        </blockquote>
        <div className={styles.devTipSeach}>
          <input type="search" placeholder="Search" onChange={onSearchDevTip} />
        </div>
        <div className={styles.devTipsList}>{DevTipsList}</div>
        <NewsLetterForm />
      </div>
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
      const tipDate = matter(
        fs.readFileSync(path.join(contentPath, content, tip), "utf-8")
      ).data.date;
      devTips.push({
        category: content,
        date: tipDate,
        tip: tip.split("-").slice(1).join("-").replace(/.md/, ""),
      });
    });
  }

  devTips.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return {
    props: {
      contents: contents.sort(),
      devTips: devTips,
    },
  };
}

export default DevTips;
