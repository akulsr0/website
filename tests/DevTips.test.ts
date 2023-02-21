import fs from "fs";
import path from "path";
import moment from "moment";
import { execSync } from "child_process";

describe("DevTips", () => {
  beforeAll(() => {
    execSync("node prebuild.js");
  });

  it("DevTips date should be valid", () => {
    const devTipsString = fs.readFileSync(
      path.join("content/devtips.json"),
      "utf-8"
    );
    const { devTips } = JSON.parse(devTipsString);
    let i = 1;
    devTips.forEach((dt: Record<string, string | number>) => {
      const momentDate = moment(dt.date);
      expect(momentDate.isValid()).toBe(true);
    });
  });
});
