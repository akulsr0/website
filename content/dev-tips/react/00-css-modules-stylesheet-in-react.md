---
title: CSS Modules StyleSheet in React
category: react
date: 09-Jan-2022
---

### What are CSS Modules?

CSS Modules are nothing but css files in which all the styles are scoped locally by default.

If we use normal css, the styles (class names, animation) are scoped globally. But with css modules we can have same class name in different files.

<br />

Let's check it in action with example of using normal css and css modules in React-

<br />

### Using Normal CSS

Suppose we have two different CSS files (for two different things) which have a same class name. And, we want to use that same class name from both css files in a React Component. Then while assigning className, we dont have a way to tell from which css file we should pick the class name.

<br />

In the example below, we have an App component which has a blog and subscribe form. For both, blog and subscribe form we have a class name (wrapper) defined in respective css files. But we can see that the styles of the file which is imported last is preferred, and we cannot chose from where it should take the class name.

<details open>
<summary>App.js</summary>

```js
import "./blog.css";
import "./subscribe.css";

export default function App() {
  return (
    <>
      <article className="wrapper">
        Consider this as a blog space.
        <p>This is paragraph 1</p>
        <p>This is paragraph 2</p>
        <p>This is paragraph 3</p>
      </article>
      <section className="wrapper">
        <h1>Subscribe here</h1>
        <input placeholder="Email" />
        <button>Submit</button>
      </section>
    </>
  );
}
```

</details>

<details open>
<summary>blog.css</summary>

```css
.wrapper {
  background-color: yellow;
}
```

</details>

<details open>
<summary>subscribe.css</summary>

```css
.wrapper {
  background-color: brown;
}
```

</details>

<details open>
<summary>Output</summary>

![normal-css-output](https://user-images.githubusercontent.com/43666833/148265812-1e99dcfa-8d4e-42ed-b5f6-7e58f0d8ffa0.png)

</details>

To overcome this, we can use CSS as modules (CSS Modules)

<br />

### Using CSS Modules

To use CSS Modules, we need to rename our css files from _.css_ to _.module.css_, so that the bundler can identify it. Or else, we can set the css-loader option _modules_ as _true_ in webpack configuration. Check more about it <a href='https://webpack.js.org/loaders/css-loader/#modules' target='_blank'>here</a>.

Here's how we can use CSS Modules in React-

<details open>
<summary>App.js</summary>

```js
import blogStyles from "./blog.module.css";
import subscribeStyles from "./subscribe.module.css";

export default function App() {
  return (
    <>
      <article className={blogStyles.wrapper}>
        Consider this as a blog space.
        <p>This is paragraph 1</p>
        <p>This is paragraph 2</p>
        <p>This is paragraph 3</p>
      </article>
      <section className={subscribeStyles.wrapper}>
        <h1>Subscribe here</h1>
        <input placeholder="Email" />
        <button>Submit</button>
      </section>
    </>
  );
}
```

</details>

<details open>
<summary>blog.module.css</summary>

```css
.wrapper {
  background-color: yellow;
}
```

</details>

<details open>
<summary>subscribe.module.css</summary>

```css
.wrapper {
  background-color: brown;
}
```

</details>

<details open>
<summary>Output</summary>

![css-modules-output](https://user-images.githubusercontent.com/43666833/148267967-8a42b982-bea5-45f1-b449-f33e3ea2aade.png)

</details>

That's how we can take advantage of CSS Modules in our React app to achieve modularity among components styling.
