import moment from "moment";

export const getFormattedPRData = (res: Record<string, any>) => {
  const formattedData = {
    title: res.title,
    isOpen: res.state === "open",
    isMerged: Boolean(res["pull_request"]["merged_at"]),
    url: res["pull_request"]["html_url"],
    createdAt: res["created_at"],
    closedAt: moment(res["closed_at"]).format("DD-MMM-YYYY"),
    prNumber: res.number,
  };
  return formattedData;
};
