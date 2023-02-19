import { NextApiRequest, NextApiResponse } from "next";
import blogs from "../../../content/blogs.json";

export default function getBlogsList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ data: blogs, success: true });
}
