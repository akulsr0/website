const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

main();

function main() {
  const devTips = getDevTips();
  const blogs = getBlogs();
  writeDevTipsJSON(JSON.stringify(devTips));
  writeBlogsJSON(JSON.stringify(blogs));
  writeLearningSeriesIndex();
  writeLearningContentJSON();
}

function writeLearningSeriesIndex() {
  const learningPath = path.join("content/learning");
  const learningContent = fs.readdirSync(learningPath);
  for (const series of learningContent) {
    const seriesPath = path.join(learningPath, series);
    const seriesContent = fs.readdirSync(seriesPath);
    const res = [];
    for (const sc of seriesContent) {
      if (sc === "index.md") continue;
      const id = sc.split("_")[0];
      const title = sc.split("_")[1].split(".md")[0];
      const markup = `<li>&nbsp;<a href='/learning/${series}/${title}'>${title}</a></li>`;
      res.push({ id, markup });
    }
    const finalMarkupArr = res
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map((e) => e.markup);
    const finalMarkup = `<ol>${finalMarkupArr.join("")}</ol>`;
    fs.writeFileSync(seriesPath + "/index.md", finalMarkup);
  }
}

function writeLearningContentJSON() {
  const learningPath = path.join("content/learning");
  const learningContent = fs.readdirSync(learningPath);
  const content = learningContent.map((lc) => {
    const childrenPath = path.join(learningPath, lc);
    const children = fs.readdirSync(childrenPath);
    return {
      slug: lc,
      title: lc.split("-").join(" "),
      children,
    };
  });
  const filepath = path.join("./content/learning.json");
  fs.writeFileSync(filepath, JSON.stringify(content));
}

function writeDevTipsJSON(tips) {
  const filePath = path.join("./content/devtips.json");
  fs.writeFileSync(filePath, `{"devTips": ${tips}}`);
}

function getDevTips() {
  const contentPath = path.join("content/dev-tips");
  const contents = fs.readdirSync(contentPath);
  const devTips = [];

  /**
   * When new category introduced, append at end only
   * This mapping is used to generate id for devtip
   * DevTip Id Format - DT-[categoryId]-[serial]
   * Example - DT-3-1
   * From above id, we can know its 1(index) devtip from category[3] i.e. vscode
   *
   * NEVER CHANGE EXISTING INDEX::CATEGORY MAPPING
   */
  const DevTipCategories = ["github", "others", "react", "vscode", "webdev"];

  for (let content of contents) {
    const _cPath = path.join(contentPath, content);
    const _devTips = fs.readdirSync(_cPath);
    _devTips.forEach((tip) => {
      const tipDate = matter(
        fs.readFileSync(path.join(contentPath, content, tip), "utf-8")
      ).data.date;
      const categoryId = DevTipCategories.indexOf(content);
      devTips.push({
        category: content,
        id: `DT-${categoryId}-${Number(tip.split("-")[0])}`,
        date: tipDate,
        serial: tip.split("-")[0],
        tip: tip.split("-").slice(1).join("-").replace(/.md/, ""),
      });
    });
  }

  devTips.sort((a, b) => {
    if (a.date === b.date) {
      return b.serial - a.serial;
    }
    return Date.parse(b.date) - Date.parse(a.date);
  });
  return devTips;
}

function writeBlogsJSON(blogs) {
  const filePath = path.join("./content/blogs.json");
  fs.writeFileSync(filePath, `{"blogs": ${blogs}}`);
}

function getBlogs() {
  const blogsPath = path.join("content/blogs");
  const blogs = fs.readdirSync(blogsPath);
  blogs.sort((a, b) => {
    const firstId = Number(a.split("-")[0]);
    const secondId = Number(b.split("-")[0]);
    return firstId - secondId;
  });
  const blogsContent = blogs
    .map((blog, idx) => {
      const blogContent = fs.readFileSync(path.join(blogsPath, blog));
      const { data } = matter(blogContent);
      return { data: { ...data, id: idx + 1 } };
    })
    .reverse();
  return blogsContent;
}
