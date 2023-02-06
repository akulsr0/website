---
id: 12
title: example - build size compare for pull requests
date: 06-Feb-2023
---

## Build Size Comparison for Pull Requests

We can write a workflow to automate and check the difference between the size of pull request and base branch build, with a nice comment on the same pull request showing the size difference and percentage change.

<br />

### Here's how it will look

<img style='margin: 1rem 0' src='https://user-images.githubusercontent.com/43666833/216977256-b42d09f3-8d38-47c3-b37c-1aa8e97d5a92.png' alt='build-compare-comment'>

<br />

### Prerequisites for this workflow

- Install _get-folder-size_ package as dev dependency, to get the size of your build folder.

```bash
npm i -D get-folder-size
```

- A script which will run after your _build_ command and get the stats of your build folder into a _stats.json_ file. Following is the _scripts/build-size.js_ which we will be using for the same.

```js
/* scripts/build-size.js */

import getFolderSize from "get-folder-size";
import path from "path";
import fs from "fs";

function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

const getSize = async () => {
  const size = await getFolderSize.loose("./dist"); // Your build folder path here
  const readableSize = humanFileSize(size);
  return {
    size: {
      bytes: size,
      readableString: readableSize,
    },
  };
};

(async () => {
  const result = await getSize();
  const filePath = path.resolve("./stats.json");
  fs.writeFileSync(filePath, `${JSON.stringify(result)}`);
})();
```

- **Important:** The above script needs to be merged to the base branch (before writing workflow) so that it would be available when size needs to be computed at the workflow.
- **Github Personal Access Token** - official documentation for <a href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token' target='_blank'>creating a personal access token</a>.
- A template markdown file for your comment i.e. _comment.md_ inside your _.github/workflows_ folder.

```text
## Bundle Size Difference

| Old size | New size | Diff                     |
| -------- | -------- | ------------------------ |
| {OLD}    | {NEW}    | {DIFF} ({DIFF_PERCENT}%) |
```

<br />

### Workflow to comment Build Size Comparison

The workflow will be divided into three jobs - _build-base_, _build-pr_ and _report_. The first two jobs will build respective code and get the final build folder statistics into a _stats.json_ file which will be eventually uploaded as artifact to be used by the _report_ job. The _report_ job will access the build size of both base and pull request branch and compute the difference and difference percentage and pass that information to next step to comment it on the pull request.

```yml
name: Build Size Compare

on:
  pull_request:
    branches:
      - main
    types: [opened, synchronize, reopened]

jobs:
  build-base:
    name: Build base
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          ref: ${{ github.base_ref }}

      - name: Install deps (with cache)
        uses: bahmutov/npm-install@v1.7.10
        with:
          working-directory: "./"
          useLockFile: false

      - name: Build
        run: npm run build
        env:
          CI: false

      - name: build stats file
        run: node ./scripts/build-size.js

      - name: Upload pr stats.json
        uses: actions/upload-artifact@v2
        with:
          name: base
          path: ./stats.json
          retention-days: 1

  build-pr:
    name: Build PR
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install deps (with cache)
        uses: bahmutov/npm-install@v1.7.10
        with:
          working-directory: "./"
          useLockFile: false

      - name: Build
        run: npm run build
        env:
          CI: false

      - name: build stats file
        run: node ./scripts/build-size.js

      - name: Upload pr stats.json
        uses: actions/upload-artifact@v2
        with:
          name: pr
          path: ./stats.json
          retention-days: 1

  report:
    name: Generate report
    runs-on: ubuntu-latest
    needs: [build-base, build-pr]

    steps:
      - name: Checkout PR
        uses: actions/checkout@v2

      - name: Download base stats
        uses: actions/download-artifact@v2
        with:
          name: base
          path: base

      - name: Download PR stats
        uses: actions/download-artifact@v2
        with:
          name: pr
          path: pr

      - name: Getting build size
        id: get-build-size
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');

            function humanFileSize(size) {
              var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
              return (
                (size / Math.pow(1024, i)).toFixed(2) * 1 +
                ' ' +
                ['B', 'kB', 'MB', 'GB', 'TB'][i]
              );
            }

            const baseResultString = fs.readFileSync('./base/stats.json', 'utf-8');
            const prResultString = fs.readFileSync('./pr/stats.json', 'utf-8');
            const baseSize = JSON.parse(baseResultString).size;
            const prSize = JSON.parse(prResultString).size;
            const baseSizeString = baseSize.readableString;
            const prSizeString = prSize.readableString;
            const diffInBytes = prSize.bytes - baseSize.bytes;
            const diffSizeString = humanFileSize(diffInBytes);
            const diffPerc = (diffInBytes*100) / baseSize.bytes;

            core.setOutput("baseSizeString", baseSizeString);
            core.setOutput("prSizeString", prSizeString);
            core.setOutput("diffSizeString", diffSizeString);
            core.setOutput("percent", diffPerc.toFixed(2));

      - name: Comment
        uses: NejcZdovc/comment-pr@v1.1.1
        with:
          file: "comment.md"
        env:
          GITHUB_TOKEN: ${{secrets.GH_ACTION_EXAMPLES_PAT}}
          OLD: ${{steps.get-build-size.outputs.baseSizeString}}
          NEW: ${{steps.get-build-size.outputs.prSizeString}}
          DIFF: ${{steps.get-build-size.outputs.diffSizeString}}
          DIFF_PERCENT: ${{steps.get-build-size.outputs.percent}}
```

### Result

I have created a new pull request with a demo image which will increase the build size, and with the above workflow we'll be getting a comment about this information. Here's the result for above workflow, you can also view it on the <a href='https://github.com/akulsr0/github-action-examples/pull/21#issuecomment-1418089120' target='_blank'>pull request</a>

<img style='margin: 1rem 0' src='https://user-images.githubusercontent.com/43666833/216984277-f57e5299-4fec-4b26-bae9-7300a8775122.png' alt='build-compare-result'>
