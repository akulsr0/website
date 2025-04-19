import fs from "fs";
import path from "path";
import matter from "gray-matter";

describe("Blogs", () => {
  it("blogs should have valid slug", () => {
    const blogsPath = path.join("content/blogs");
    const blogs: string[] = fs.readdirSync(blogsPath);
    blogs.forEach((blog) => {
      const blogContent = fs.readFileSync(blogsPath + `/${blog}`, "utf-8");
      const { data } = matter(blogContent);
      expect(blog.includes(data.slug)).toBe(true);
    });
  });
});
