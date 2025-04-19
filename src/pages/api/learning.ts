import { NextApiRequest, NextApiResponse } from "next";
import learning from "../../../content/learning.json";

export default function getLearningList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ data: learning, success: true });
}
