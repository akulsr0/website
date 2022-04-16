const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

main();

function main() {
  const devTips = getDevTips();
  const blogs = getBlogs();
  writeDevTipsJSON(JSON.stringify(devTips));
  writeBlogsJSON(JSON.stringify(blogs));
}

function writeDevTipsJSON(tips) {
  const filePath = path.join("./content/devtips.json");
  fs.writeFileSync(filePath, `{"devTips": ${tips}}`);
}

function getDevTips() {
  const contentPath = path.join("content/dev-tips");
  const contents = fs.readdirSync(contentPath);
  const devTips = [];

  for (let content of contents) {
    const _cPath = path.join(contentPath, content);
    const _devTips = fs.readdirSync(_cPath);
    _devTips.forEach((tip) => {
      const tipDate = matter(
        fs.readFileSync(path.join(contentPath, content, tip), "utf-8")
      ).data.date;
      devTips.push({
        category: content,
        date: tipDate,
        tip: tip.split("-").slice(1).join("-").replace(/.md/, ""),
      });
    });
  }

  devTips.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return devTips;
}

function writeBlogsJSON(blogs) {
  const filePath = path.join("./content/blogs.json");
  fs.writeFileSync(filePath, `{"blogs": ${blogs}}`);
}

function getBlogs() {
  const blogsPath = path.join("content/blogs");
  const blogs = fs.readdirSync(blogsPath);
  const blogsContent = blogs
    .map((blog) => {
      const blogContent = fs.readFileSync(path.join(blogsPath, blog));
      const { data } = matter(blogContent);
      return { data };
    })
    .reverse();
  return blogsContent;
}
