---
title: How to know if a CSS property is supported by your browser through Javascript?
category: webdev
date: 25-Dec-2021
---

There could be cases where you need to add styles to markup through javascript, but before doing that you need to be sure if that is supported by the browser on which it's running. So that you can choose what to do accordingly.

Here's how you can do that:

<br />

![check-if-css-supports](https://user-images.githubusercontent.com/43666833/146938421-9e3240e1-e088-4363-b0f2-d332aa9eab1d.gif)

<br />

In your javascript file, you can add a check like following -

```js
if (CSS.supports(property, value)) {
  // css property is supported
} else {
  // css property is not supported
}
```
