---
title: Comparing CSS Specificity
category: css
date: 27-June-2023
---

Specificity plays a important role in understanding CSS and how it gets applied. There can be cases where you've multiple selectors and you want to compare the specificity among them or maybe sort them with respect to their specificity.

<br height='1' />

There's an npm package and a UI playground to check that.

- npm - <a href='https://npm.im/specificity' target='_blank'>specificity</a>
- playground - <a href='https://specificity.keegan.st/' target='_blank'>specificity calculator</a>

<br height='1' />

Let's take a very basic example and see how we can make use of it.

<br height='1' />

<img src='https://github.com/akulsr0/website/assets/43666833/e148c7d4-01d7-4d85-ab56-ccc6931be40c' alt='specificity-demo'>

<br height='1' />

So, in the above example we have the following basic markup and css.

```html
<style>
  body > :first-child {
    background: red;
  }
  #first-element {
    background: green;
  }
  body > :first-child#first-element {
    background: blue;
  }
</style>

<body>
  <div
    id="first-element"
    style="width: 16rem; height: 16rem; border: 10px solid black;"
  ></div>
</body>
```

And, now if we want to compare these selectors to understand how it's getting applied, we can use the above mentioned <a href='https://specificity.keegan.st/' target='_blank'>playground</a>. We can even sort the selectors within the playground.

<br />

<img class='dev-tip-img mw-full' src='https://github.com/akulsr0/website/assets/43666833/510b332a-f237-4a5b-ae3d-35374d2917b1' alt='specificity-playground-demo'>
