const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const devTips = getDevTips();
writeDevTipsJSON(JSON.stringify(devTips));

function writeDevTipsJSON(tips) {
  console.log("Writing devTips.json");
  const filePath = path.join("content/devtips.json");
  console.log("PATH: ", filePath);
  console.log("CONTENT: ", `{"devTips": ${tips}}`);
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
