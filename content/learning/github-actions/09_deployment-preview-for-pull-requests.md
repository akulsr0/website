---
id: 9
title: example - deployment preview for pull requests
date: 23-Jan-2023
---

## Automatic deployment preview for pull requests

We can write a workflow which can deploy the website to a preview url when a pull request is created or updated. It is similar to our previous example where we have added the workflow for continuous deployment of our website when code is pushed to the main branch. This workflow will help us to easily see the ui changes made in an pull request.

The prerequisite for this workflow are same as the previous workflow -

- **A static website (or build folder).** This is the folder where your _index.html_ stays. If you're using any lib/framework, this would be generated after building your project.
- **Github Personal Access Token** - official documentation for <a href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token' target='_blank'>creating a personal access token</a>.
- **Surge email id** stored in github secrets.
- **Surge token** stored in github secrets.

<br />

### Workflow for Automatic Preview Deployments for Pull Requests

```yml
name: Website Preview Deployment

on:
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  website-preview-deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 16

      - uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GH_ACTION_EXAMPLES_PAT }}
          message: |
            ⏳ Deploying to https://github-action-examples-pr${{ github.event.number }}.surge.sh

      - name: Install deps
        run: npm ci

      - name: Build Website
        run: npm run build

      - name: Deploy Website
        uses: dswistowski/surge-sh-action@v1
        with:
          domain: "github-action-examples-pr${{ github.event.number }}.surge.sh"
          project: "dist"
          login: ${{ secrets.GH_ACTION_SURGE_LOGIN }}
          token: ${{ secrets.GH_ACTION_SURGE_TOKEN }}

      - name: Comment Preview URL
        if: ${{ success() }}
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GH_ACTION_EXAMPLES_PAT }}
          message: |
            Preview URL: https://github-action-examples-pr${{ github.event.number }}.surge.sh
```

### Result

Here's the result of above workflow, you can also visit the <a href='' target=''>pull request</a>.

<img style='margin: 1rem 0' src='https://user-images.githubusercontent.com/43666833/216757445-430460e5-0375-47d1-8a91-bdbe4f651dec.gif' alt='preview-deployment-result'>
