const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

main();

function main() {
  const devTips = getDevTips();
  const blogs = getBlogs();
  const learningAll = getLearningAllContent();
  writeDevTipsJSON(JSON.stringify(devTips));
  writeBlogsJSON(JSON.stringify(blogs));
  writeLearningAllContentJSON(learningAll);
  writeLearningSeriesIndex();
  writeLearningContentJSON();
  const allContent = [
    blogs.map((d) => ({ ...d.data })),
    devTips,
    learningAll,
  ].flat();
  writeAllContent(allContent);
}

function writeAllContent(allContent) {
  const sortedAllContent = allContent.sort((a, b) => {
    if (a.date === b.date) {
      return b.serial - a.serial;
    }
    return Date.parse(b.date) - Date.parse(a.date);
  });
  const filepath = path.join("./content/allContent.json");
  fs.writeFileSync(filepath, JSON.stringify(sortedAllContent));
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
      const slug = sc.split("_")[1].split(".md")[0];
      const p = path.join(learningPath, series, sc);
      const data = fs.readFileSync(p, "utf-8");
      const metaData = matter(data);
      const title = metaData.data.title;
      const markup = `<li>&nbsp;<a href='/learning/${series}/${slug}'>${title}</a></li>`;
      res.push({ id, markup });
    }
    const finalMarkupArr = res
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map((e) => e.markup);
    const finalMarkup = `<ol>${finalMarkupArr.join("")}</ol>`;
    fs.writeFileSync(seriesPath + "/index.md", finalMarkup);
  }
}

function getLearningAllContent() {
  const learningPath = path.join("content/learning");
  const learningContent = fs.readdirSync(learningPath);
  const learning = [];
  for (const series of learningContent) {
    const learningFiles = fs
      .readdirSync(`content/learning/${series}`)
      .filter((f) => !["index.md"].includes(f));
    for (const file of learningFiles) {
      const fileContent = fs.readFileSync(
        `content/learning/${series}/${file}`,
        "utf-8"
      );
      const { data } = matter(fileContent);
      learning.push({
        ...data,
        series,
        slug: file.split("_")[1].replace(".md", ""),
        type: "learning",
      });
    }
  }
  return learning;
}

function writeLearningAllContentJSON(learning) {
  const filepath = path.join("./content/learningAll.json");
  fs.writeFileSync(filepath, JSON.stringify({ learning }));
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

  for (let content of contents) {
    const _cPath = path.join(contentPath, content);
    const _devTips = fs.readdirSync(_cPath);
    _devTips.forEach((tip) => {
      const data = matter(
        fs.readFileSync(path.join(contentPath, content, tip), "utf-8")
      ).data;
      const tipDate = data.date;
      devTips.push({
        category: content,
        date: tipDate,
        keywords: data?.keywords,
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

  let l = devTips.length;
  const devTipsWithId = devTips.map((d) => ({ ...d, id: l--, type: "devtip" }));

  return devTipsWithId;
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
      return { data: { ...data, id: idx + 1, type: "blog" } };
    })
    .reverse();
  return blogsContent;
}
