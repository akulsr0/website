import React, { useState } from "react";
import Link from "next/link";
import defaults from "../constants/default.json";
import styles from "../styles/RecentContent.module.css";

const contentLinkMap = {
  devtip: <Link href="/dev-tips">devtip</Link>,
  blog: <Link href="/blogs">blog</Link>,
  learning: <Link href="/learning">learning</Link>,
};

function getSlug(content: any) {
  if (content.type === "devtip") return content.tip;
  return content.slug;
}
function getTitle(content: any) {
  if (content.type === "devtip") return content.tip.split("-").join(" ");
  return content.title.toLowerCase();
}
function getType(content: any) {
  return content.type;
}
function getLink(content: any) {
  if (content.type === "devtip")
    return `/dev-tips/${content.category}/${content.tip}`;
  if (content.type === "blog") return `/blogs/${content.slug}`;
  return `/learning/${content.series}/${content.slug}`;
}
function getDate(content: any) {
  const [date, month, year] = content.date.split("-");
  return `${month} ${date}, ${year}`;
}

export default function RecentContent({
  recentContent,
}: {
  recentContent: Record<string, unknown>[];
}) {
  const RECENT_CONTENT_COUNT = defaults.recent_content_count;
  const [list, setList] = useState(
    recentContent.slice(0, RECENT_CONTENT_COUNT)
  );
  const showViewMore = list.length < recentContent.length;

  function onViewMore() {
    const newContent = recentContent.slice(
      0,
      list.length + RECENT_CONTENT_COUNT
    );
    setList(newContent);
  }

  if (!defaults.show_recent_content) return null;

  return (
    <section className={styles.wrapper}>
      <h3>Archive</h3>
      <ul className={styles.list}>
        {list.map((l) => (
          <li key={getSlug(l)}>
            <a href={getLink(l)}>{getTitle(l)}</a>
            <div className={styles.info}>
              on
              <span> {getDate(l)}</span>
              {" in "}
              {contentLinkMap[getType(l) as keyof typeof contentLinkMap]}
            </div>
          </li>
        ))}
      </ul>
      {showViewMore ? (
        <span className={styles.viewMore} onClick={onViewMore}>
          View More
        </span>
      ) : null}
      <div className={styles.imageWrapper}>
        <img src="/images/home-image.png" alt="akulsr0" />
      </div>
    </section>
  );
}
