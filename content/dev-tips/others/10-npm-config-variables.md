---
title: npm config variables
category: others
date: 27-Oct-2022
---

In javascript projects, we can set _config_ object in the package.json which takes config variables which we can use in our script declarations.

Let's take an example, here's a minimal project with following package.json

```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "config": {
    "port": 3005
  },
  "scripts": {
    "start": "echo My port is $npm_package_config_port"
  },
  "author": "Akul Srivastava",
  "license": "ISC"
}
```

<br />

We can use this variable in our scripts by adding <strong>$npm_package_config\_</strong> prefix to it, as shown above. Here's the output for the same-

<br />

<img src='https://user-images.githubusercontent.com/43666833/198331183-1f839427-29de-4ad1-9469-ba3c6563ad9a.png' alt='config-usecase-script-output'>
