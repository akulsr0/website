---
id: 8
title: example - deploying website
date: 23-Jan-2023
---

## Automatic deployments for your website

We can write a workflow to automate the deployments of our static website. There are a lot of service providers which we can use to deploy our website, in this example I will be using surge to do the same.

The prerequisite for this are:

- **A static website (or build folder).** This is the folder where your _index.html_ stays. If you're using any lib/framework, this would be generated after building your project.
- **Github Personal Access Token** - official documentation for <a href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token' target='_blank'>creating a personal access token</a>.
- **Surge email id** stored in github secrets.
- **Surge token** stored in github secrets.

### Creating surge account and getting token

- Install surge on your system

```bash
npm i -g surge
```

- Logging/Creating an account by entering _surge_ in your terminal. Here's official docs to <a href='https://surge.sh/help/getting-started-with-surge' target='_blank'>get started</a>.

```bash
surge
```

- For getting token, enter _surge token_ in your terminal

```bash
surge token
```

- Now, store both your email and token in github secret. You can also go through the official documentation for <a href='https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository' target='_blank'>adding github action secret</a>

<br />

### Workflow for Automatic Deployments

Once, you are done with the above steps and have surge email and token in your github secret, you can proceed further with the workflow.

```yml
name: Website Deployment

on:
  push:
    branches:
      - main

jobs:
  website-deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install deps
        run: npm ci

      - name: Build Website
        run: npm run build # your build command here

      - name: Deploy Website
        uses: dswistowski/surge-sh-action@v1
        with:
          domain: "github-action-examples.surge.sh" # your preferred domain (shouldn't be already taken by someone)
          project: "dist" # your path to the build folder
          login: ${{ secrets.GH_ACTION_SURGE_LOGIN }} # your surge email secret key
          token: ${{ secrets.GH_ACTION_SURGE_TOKEN }} # your surge token secret key
```

### Result

Here's the result of above action, you can visit the deployed website - <a href='http://github-action-examples.surge.sh/' target='_blank'>http://github-action-examples.surge.sh/</a>

You can also view the <a href='https://github.com/akulsr0/github-action-examples/actions/runs/4036483855/jobs/6939110980' target='_blank'>steps and output for the above workflow</a>.

<img style='margin: 1rem 0' src='https://user-images.githubusercontent.com/43666833/215323365-a31cbb8a-c7d5-4e69-b270-4ef6269304b8.png' alt='deployment-action-result'>
