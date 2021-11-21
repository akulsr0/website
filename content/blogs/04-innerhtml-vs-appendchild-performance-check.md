---
title: Performance Check - innerHTML vs appendChild
description: We often use innerHTML and appendChild to add HTML Elements to the markup. But how these two differ?
slug: innerhtml-vs-appendchild-performance-check
date: 21-Nov-2021
isTechBlog: true
---

We often use innerHTML and appendChild to add HTML Elements to the markup. But how these two differ? Which is better? Which is more performant?

<br />

Let's check this, creating a demo markup for the following analysis:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Performance Check: innerHTML vs appendChild</title>
  </head>
  <body>
    <h1>Performance Check</h1>
    <h3>innerHTML vs appendChild</h3>
    <main></main>
    <script src="main.js"></script>
  </body>
</html>
```

For the analysis, we will set innerHTML and appendChild 1000 times, so that we get some comparable timestamps.

<br />

### innerHTML

<br />

As per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), **innerHTML** gets or sets the HTML or XML markup contained within the element.

<br />

### Performance of innerHTML

<br />

#### Code

```javascript
const mainBox = document.querySelector("main");

const LIMIT = 1000;

console.time("innerHTML");
for (let i = 0; i < LIMIT; i++) {
  mainBox.innerHTML += `<div>innerHTML - ${i}</div>`;
}
console.timeEnd("innerHTML");
```

#### 5 Attempts with innerHTML

<br />

![innerhtml](https://user-images.githubusercontent.com/43666833/142770313-d689a97a-ec65-48c9-a533-9231890b331c.gif)

<br />

#### innerHTML Results

<br />

| Sr. No.  | Time taken |
| -------- | ---------- |
| 1        | 1665.57 ms |
| 2        | 1782.49 ms |
| 3        | 1546.03 ms |
| 4        | 1490.70 ms |
| 5        | 1899.51 ms |
| -------- | ---------- |
| Average  | 1676.86 ms |

<br />

### appendChild

<br />

As per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild), The appendChild method adds a node to the end of the list of children of a specified parent node.

<br />

### Performance of appendChild

<br />

#### Code

```javascript
const mainBox = document.querySelector("main");

const LIMIT = 1000;

console.time("appendChild");
for (let i = 0; i < LIMIT; i++) {
  const el = document.createElement("div");
  el.innerText = `appendChild - ${i}`;
  mainBox.appendChild(el);
}
console.timeEnd("appendChild");
```

#### 5 Attempts with appendChild

<br />

![appendChild](https://user-images.githubusercontent.com/43666833/142770696-c1a0f8a4-3354-4594-bdcc-777170aca3bc.gif)

<br />

#### appendChild Results

<br />

| Sr. No.  | Time taken |
| -------- | ---------- |
| 1        | 5.54 ms    |
| 2        | 3.81 ms    |
| 3        | 3.98 ms    |
| 4        | 4.35 ms    |
| 5        | 4.84 ms    |
| -------- | ---------- |
| Average  | 4.50 ms    |

<br />

### Conclusion

<img src='https://user-images.githubusercontent.com/43666833/142771070-246ce46a-f723-44dc-8ff5-2f3f519a74fb.png' alt='graph' width='600px'>

#### what's the difference?

- If a element (say el) markup is set using innerHTML, it will rebuild all the DOM element's inside that element (el).
- If a element (say el) markup is set by adding child using appendChild, it will only build that particular element node and append it. Saving the performance in rebuilding all the DOM element's inside that element (el).

#### when to use?

- **innerHTML:** innerHTML can become the perfect choice when the need is to set markup once, and that markup is large. We can also insert data using string interpolation.
- **appendChild:** appendChild can be very performant when the need is to append children in a loop.
