---
title: running a function only once in javascript
category: others
date: 21-June-2023
keywords: how to run a function once in javascript, run a function once js
---

#### using 'once' npm package

- Install <a href='http://npm.im/once' target='_blank'>once</a> npm package

```bash
npm i once
```

- Wrap your function which you want to call once

```js
import once from "once";

function greet() {
  console.log("Inside greet -", "Hello World");
}

const greetOnce = once(greet);

greetOnce();
greetOnce();
greetOnce();
```

- **Output**

<img class='dev-tip-img mw-full' src='https://github.com/akulsr0/website/assets/43666833/b5dab73b-4a9c-4c5b-bebc-9a493a777467' alt='once-npm-output'>

> Note: Incase your function returns something, it will call the function only once and memoize the returning value to return for subsequent calls

#### using custom polyfill for once

- creating our own once function

```js
function once(fn) {
  let ran = false;
  let result;
  return function () {
    if (ran) return result;
    result = fn.apply(this, arguments);
    ran = true;
    return result;
  };
}
```

- Wrap your function which you want to call once, following is the same example with output

<img class='dev-tip-img mw-full' src='https://github.com/akulsr0/website/assets/43666833/fca09a42-3ebe-4b12-88af-ae34290e4278' alt='once-polyfill-output'>

<br />

#### References

- CodeSandbox - <a href='https://codesandbox.io/s/heuristic-pine-khd3j4?file=/src/index.js' target='_blank'>once using npm package</a>
- CodeSandbox - <a href='https://codesandbox.io/s/frosty-resonance-ds4lmc?file=/src/index.js' target='_blank'>once using polyfill</a>
