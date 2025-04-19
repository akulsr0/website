import { ILearningRecommended } from "../interfaces/Learning";

export function getLearningTitleFromFileName(fileName: string): string {
  return fileName.split("_")[1].replace(".md", "");
}

export function getRecommendedLearningContent(
  series: Array<string>,
  title: string
) {
  const recommended: ILearningRecommended = {};
  for (let i = 0; i < series.length; i++) {
    if (series[i] === title) {
      if (i > 0 && series[i - 1] !== "index.md") {
        recommended.prev = getLearningTitleFromFileName(series[i - 1]);
      }
      if (i < series.length - 1 && series[i + 1] !== "index.md") {
        recommended.next = getLearningTitleFromFileName(series[i + 1]);
      }
    }
  }
  return recommended;
}

export function getLearningLink(series: string, slug: string) {
  return `https://akulsrivastava.com/learning/${series}/${slug}`;
}
