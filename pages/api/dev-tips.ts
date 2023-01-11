import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function getDevTipsList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const devTips = fs.readFileSync("content/devTips.json", "utf-8");
  const data = JSON.parse(devTips);
  res.json({ data, success: true });
}
