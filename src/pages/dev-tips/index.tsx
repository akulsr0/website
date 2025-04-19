import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import moment from "moment";
import fs from "fs";
import path from "path";

import { useTheme } from "../../context/ThemeContext";
import defaults from "../../constants/default.json";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "../../styles/DevTips.module.css";

const DEV_TIP_COUNT = defaults.dev_tips_count;

const devTipsKeywords = [
  "dev tips",
  "development tips",
  "dev tricks",
  "development tricks",
  "dev tips and tricks",
  "development tips and tricks",
  "programming tips and tricks",
  "coding tips and tricks",
  "javascript tips and tricks",
  "react tips and tricks",
  "vscode tips and tricks",
  "github tips and tricks",
];

interface DevTipsProps {
  contents: Array<string>;
  devTips: Array<Record<string, string>>;
}

const DevTips: NextPage<DevTipsProps> = (props) => {
  const { isDarkTheme } = useTheme();
  const { contents, devTips } = props;

  const _tips = devTips.slice(0, DEV_TIP_COUNT);
  const [tips, setTips] = React.useState(_tips);
  const [showViewMore, setShowViewMore] = React.useState(true);

  const DevTipsCategories = contents.map((c) => (
    <span key={c}>
      <Link href={`/dev-tips/${c}`}>
        {`${c} (${devTips.filter((dt) => dt.category === c).length})`}
      </Link>
    </span>
  ));

  const DevTipsList = tips.map(({ category, date, tip }) => {
    const formattedDate = moment(date).format("DD-MM-YYYY");
    return (
      <div key={tip}>
        <span style={{ color: isDarkTheme ? "#bbb" : "#888" }}>
          {formattedDate}
        </span>
        {"-"}
        <a href={`/dev-tips/${category}/${tip}`}>
          {tip.split("-").join(" ")}
        </a>
      </div>
    );
  });

  function ViewMore() {
    return showViewMore ? (
      <span
        style={{ color: isDarkTheme ? "#ced6e0" : "#3d3d3d" }}
        onClick={onClickViewMore}
      >
        View More
      </span>
    ) : null;
  }

  DevTipsList.push(<ViewMore key="view-more" />);

  function onClickViewMore() {
    const _newTips = devTips.slice(0, tips.length + DEV_TIP_COUNT);
    setTips(_newTips);
    if (_newTips.length >= devTips.length) setShowViewMore(false);
  }

  function onSearchDevTip(event: React.ChangeEvent<HTMLInputElement>) {
    const searchText = event.target.value;
    if (!searchText) {
      setShowViewMore(true);
      setTips(devTips.slice(0, DEV_TIP_COUNT));
      return;
    }
    setShowViewMore(false);
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
        title="Development Tips"
        metaDescription="I share useful development tips here. These tips are on various topics like web development, react, javascript, vscode, github, dev tools, etc..."
        keywords={devTipsKeywords}
      />
      <Header />
      <main className="main-content">
        <h3 className={styles.devTipsTitle}>Dev Tips ({devTips.length}) </h3>
        <div className={styles.devTipsCategories}>{DevTipsCategories}</div>
        <div id="content">
          <blockquote className={styles.devTipsTagline}>
            Bookmark this place for development tips.
          </blockquote>
          <div className={styles.devTipSeach}>
            <input
              style={{
                backgroundColor: isDarkTheme ? "#ced6e0" : "#f0f0f0",
                color: "#3d3d3d",
                opacity: 0.75,
              }}
              type="search"
              placeholder="Search"
              onChange={onSearchDevTip}
            />
          </div>
          <div className={styles.devTipsList}>{DevTipsList}</div>
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export async function getStaticProps() {
  const contentPath = path.join("content/dev-tips");
  const contents = fs.readdirSync(contentPath);
  const devTipsString = fs.readFileSync(
    path.join("content/devtips.json"),
    "utf-8"
  );

  const { devTips } = JSON.parse(devTipsString);

  return {
    props: {
      contents: contents.sort(),
      devTips: devTips,
    },
  };
}

export default DevTips;
