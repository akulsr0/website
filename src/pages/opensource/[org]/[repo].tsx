import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Container from "../../../components/Container";
import Head from "../../../components/_head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import styles from "../../../styles/Opensource.module.css";
import { api } from "../../../services/APIService";
import { getFormattedPRData } from "../../../helpers";

function getPRState(pr: Record<string, any>) {
  if (pr.isOpen)
    return {
      state: "open",
      color: "limegreen",
      isApproved: pr?.isApproved,
      approvedColor: "#055d20",
    };
  if (pr.isMerged) return { state: "merged", color: "blueviolet" };
  return { state: "closed", color: "red" };
}

const Repository: React.FC<null> = (): JSX.Element => {
  const router = useRouter();
  const { org, repo } = router.query;
  const [data, setData] = useState<Array<Record<string, any>>>();

  const handlePRReviewResponse = (
    err: any,
    data: Record<string, any> | null
  ) => {
    if (err) throw err;
    if (data) return data.some((review: any) => review.state === "APPROVED");
  };

  const handlePRResponse = async (
    err: any,
    data: Record<string, any> | null
  ) => {
    if (err) return;
    const formattedData = data!.items.map((item: Record<string, any>) =>
      getFormattedPRData(item)
    );
    setData(formattedData);
    const result: any = [];
    for (let i = 0; i < formattedData.length; i++) {
      const item = formattedData[i];
      const payload = {
        org: org as string,
        repo: repo as string,
        prNumber: item.prNumber,
      };
      const isApproved = await api.getPRReviewStatus(
        payload,
        handlePRReviewResponse
      );
      result.push({ ...item, isApproved });
    }

    setData(result);
  };

  useEffect(() => {
    if (org && repo) {
      const options = { org: org as string, repo: repo as string };
      api.getPullRequests(options, handlePRResponse);
    }
  }, [org, repo]);

  if (!org || !repo) return <></>;

  return (
    <Container>
      <Head title={`OSS @ ${org}/${repo}`} />
      <Header />
      <main className="main-content">
        <h2>
          {org}/{repo}
        </h2>
        {data &&
          data.map((oss) => (
            <div className={styles.ossCard} key={oss.url}>
              <div>
                <a href={oss.url} target="_blank" rel="noreferrer">
                  {oss.title}
                </a>
                <p>#{oss.prNumber}</p>
              </div>
              <p>
                {getPRState(oss)?.isApproved ? (
                  <span
                    style={{ backgroundColor: getPRState(oss)?.approvedColor }}
                  >
                    approved
                  </span>
                ) : null}
                <span style={{ backgroundColor: getPRState(oss).color }}>
                  {getPRState(oss).state}
                </span>
                {!oss.isOpen && `on ${oss.closedAt}`}
              </p>
            </div>
          ))}
      </main>
      <Footer />
    </Container>
  );
};

export default Repository;
