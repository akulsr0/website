---
title: npx alternative for yarn
category: others
date: 25-Mar-2023
---

npx is a cli tool used to execute npm package binaries without installing them globally on your machine. Similarly we can also use yarn to run npm package binaries in a temporary environment without installing them globally. We can use the <a href='https://yarnpkg.com/cli/dlx' target='_blank' rel='noreferrer'>yarn dlx</a> command which comes with Yarn v2 to do it.

<br />

#### Upgrading yarn

```bash
yarn set version berry
```

<img class='dev-tip-img mw-full' src='https://user-images.githubusercontent.com/43666833/227704837-34f4253f-ff8a-4f65-a411-189bf20c12dd.png' alt='yarn-upgrade'>

<br />

#### Example

For example, suppose we have to uglify a javascript file using a npm package such as uglify-js without installing it globally on our machine, we can do it as follows-

```bash
yarn dlx uglify-js test.js -o test.min.js
```

<img class='dev-tip-img mw-full' src='https://user-images.githubusercontent.com/43666833/227704929-10581c67-19e5-4717-b2b9-f2d23f9376cc.png' alt='yarn-dlx-example'>
