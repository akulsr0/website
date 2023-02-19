import { NextApiRequest, NextApiResponse } from "next";
import devTips from "../../../content/devtips.json";

export default function getDevTipsList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ data: devTips, success: true });
}
