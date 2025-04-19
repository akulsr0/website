---
id: 10
title: example - linting check for pull requests
date: 04-Feb-2023
---

## Linting check for Pull Requests

We can write a workflow to automate and check for linting issues in a pull request. This is a very common and widely used workflow. To get this setup, we need linter in our project, and in this example we'll see how to make it work in a javascript project with ESLint.

- Install ESLint (if not already) in your project.
- Add/Update your eslint config file as per you want.
- Add _lint_ script in your _package.json_ to check for linting issues.

```json
{
  // ...
  "scripts": {
    // ...
    "lint": "eslint src/ --quiet"
  }
}
```

### Workflow for Linting check for Pull Requests

```yml
name: Code Linting Check

on:
  pull_request:
    branches:
      - main
    types: [opened, synchronize, reopened]

jobs:
  lint-check:
    runs-on: ubuntu-latest
    name: Check PR's Linting
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

      - name: eslint check
        run: npm run lint
```

### Result

Here's the result for above workflow, you can also view it on <a href='https://github.com/akulsr0/github-action-examples/pull/17/commits/5f7cc858ed36efb11a3210384b45590a1eec021a' target='_blank'>5f7cc85</a> commit.

<img style='margin: 1rem 0' src='https://user-images.githubusercontent.com/43666833/216758204-545c614a-5b7e-4fb6-87f0-9af4a916d7ba.png' alt='linting-check-result'>
