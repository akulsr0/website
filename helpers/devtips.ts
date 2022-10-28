import { IRecommendedTip } from "../interfaces/DevTips";

export function getRecommendedDevTips(
  devTips: Array<Record<string, string>>,
  tip: string
): IRecommendedTip {
  const recommended: IRecommendedTip = {};
  for (let i = 0; i < devTips.length; i++) {
    if (devTips[i].tip === tip) {
      if (i > 0) {
        recommended.prev = devTips[i - 1];
      }
      if (i < devTips.length - 1) {
        recommended.next = devTips[i + 1];
      }
    }
  }
  return recommended;
}

export function getDevTipLink(category: string, slug: string) {
  return `https://akulsrivastava.com/dev-tips/${category}/${slug}`;
}
