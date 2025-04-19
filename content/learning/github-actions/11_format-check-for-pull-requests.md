---
id: 11
title: example - formatting check for pull requests
date: 06-Feb-2023
---

## Formatting check for Pull Requests

We can write a workflow to automate and check for formatting issues in a pull request. This is a very common and widely used workflow. To get this setup, we need formatter in our project, and in this example we'll see how to make it work in a javascript project with prettier.

- Install Prettier (if not already) in your project.
- Add _format:check_ script in your _package.json_ to check for formatting issues.

```json
{
  // ...
  "scripts": {
    // ...
    "format:check": "prettier --check './src/**/*.{js,jsx,ts,tsx,css}'"
  }
}
```

### Workflow to check formatting issues in Pull Requests

```yml
name: Code Formatting Check

on:
  pull_request:
    branches:
      - main
    types: [opened, synchronize, reopened]

jobs:
  format-check:
    runs-on: ubuntu-latest
    name: Check PR's Formatting
    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x

      - name: Install deps (with cache)
        uses: bahmutov/npm-install@v1.7.10
        with:
          working-directory: "./"
          useLockFile: false

      - name: prettier formatting check
        run: npm run format:check
```

### Result

Here's the result for above workflow, you can also view it on <a href='https://github.com/akulsr0/github-action-examples/pull/18/commits/ead6ecfd0e5e5e069de7b4639b9229b302d02526' target='_blank'>ead6ecf</a> commit.

<img style='margin: 1rem 0' src='https://user-images.githubusercontent.com/43666833/216976183-f51e73a1-26d6-4972-b3d8-9079811e63f4.png' alt='formatting-check-result'>
