import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function getBlogsList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const blogs = fs.readFileSync("content/blogs.json", "utf-8");
  const data = JSON.parse(blogs);
  res.json({ data, success: true });
}
