---
title: npm pre and post scripts
category: others
date: 27-Oct-2022
---

In javascript projects, with any script (say _something_) we can add two more special scripts with prefix **pre** and **post** which will basically run before and after the _something_ script.

Let's take an example, here's a minimal project with following package.json

```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "presomething": "echo I am happening before something",
    "something": "echo I am doing something",
    "postsomething": "echo I am happening after something"
  },
  "author": "Akul Srivastava",
  "license": "ISC"
}
```

<br />

So here, whenever we run the _something_ script, the _presomething_ script will run before it and the _postsomething_ script will run after it.

<br />

<img src='https://user-images.githubusercontent.com/43666833/198202227-db658c79-aaf6-47e4-9c1c-259e9a204a2e.png' alt='something-script-output' >
