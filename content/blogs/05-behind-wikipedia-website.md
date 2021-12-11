---
title: Behind Wikipedia Website - An Optimization
description: Wikipedia is surely one of the best things on the Internet, I use it to read about different things on a daily basis...
slug: behind-wikipedia-website
date: 11-Dec-2021
isTechBlog: true
---

Wikipedia is surely one of the best things on the Internet, I use it to read about different things on a daily basis. I have a immense respect for it, and being a engineer I thought to check how things were working behind there.

<br />

While I was looking there, I found out something (issue), which according to me can be optimized.

<br />

If you have used Wikipedia, you would know that on wiki' pages you can hover on different words and you will get a nice little preview card about them. Here's how it looks:

<br />

![wiki-preview](https://user-images.githubusercontent.com/43666833/145682083-3a2870d4-f858-4475-b8ce-4cd8b8db370f.png)

<br />

So, what is happening here is whenever you hover on a word, there is an API call, which gives the information about that word as response and that information is shown in this card.

<br />

### the issue

<br />

The issue here is - if we hover on a word again and again, it makes that API call everytime, which isn't a good thing to do. Here's how the API calls are made on hovering same words on a wiki' page:

<br />

![issue](https://user-images.githubusercontent.com/43666833/145682311-2f3d0b85-c71c-47ff-90e3-688a49ffae4a.gif)

<br />

### the solution

<br />

To reduce the number of API calls, we can maintain a mapping of words where we can store the data of API calls which are already being made.

<br />

```js
const DATA_MAP = {};

async function onHoverWord(e) {
  const word = e.target.innerText;
  const data = await fetchInfo(word);
  createCard(data, e.target.parentElement);
}

function fetchInfo(word) {
  return new Promise((resolve, reject) => {
    if (DATA_MAP[word] !== undefined) {
      resolve(DATA_MAP[word]);
    } else {
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${word}`)
        .then((res) => res.json())
        .then((data) => {
          DATA_MAP[word] = data;
          resolve(data);
        })
        .catch(reject);
    }
  });
}
```

Here is how the solution looks:

<br />

![solution](https://user-images.githubusercontent.com/43666833/145687540-d070ce45-4e44-49d0-8933-d83bb8151e19.gif)

<br />

The aim of above example is to provide solution for the multiple API calls issue and optimize that. The UI is just to help in demonstrating that.

You can find the references below:

- <a href="https://keen-goodall-18665f.netlify.app/" target="_blank" >Solution</a>
- <a href="https://keen-goodall-18665f.netlify.app/main.js" target="_blank" >Solution Code</a>
