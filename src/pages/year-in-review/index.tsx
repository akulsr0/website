import fs from "fs";

import Container from "../../components/Container";
import Head from "../../components/_head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import List from "../../components/List";

interface IYearsInReviewIndexProps {
  years: string[];
}

const YearInReviewIndex = (props: IYearsInReviewIndexProps) => {
  return (
    <Container>
      <Head
        title="Year in review"
        metaDescription="Throwback light to the events of past year."
      />
      <Header />
      <main className="main-content">
        <List
          list={props.years.reverse().map((y) => ({
            title: y,
            href: `/year-in-review/${y}`,
          }))}
          title="Year in Review"
        />
      </main>
      <Footer />
    </Container>
  );
};

export function getStaticProps() {
  const years = fs
    .readdirSync("content/year-in-review")
    .filter((y) => y.endsWith(".md"))
    .map((y) => y.split(".md")[0]);

  return {
    props: {
      years,
    },
  };
}

export default YearInReviewIndex;
