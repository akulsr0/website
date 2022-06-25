---
title: Why React 18 effect calling twice is a good thing
description:
slug: why-react-18-effect-calling-twice-is-a-good-thing
date: 25-Jun-2022
isTechBlog: true
---

If you're reading this, I am assuming that you already know that with React 18 Strict Mode `useEffect` is being called twice in development mode. If you haven't saw it yet, below is a sample for it, we can see that _Hello React 18_ log is coming twice in the console.

<iframe class='sandbox-iframe' title='useeffect-twice-iframe' src='https://stackblitz.com/edit/react-hqd7xp?devToolsHeight=50&embed=1&file=src/App.js'></iframe>

Now seeing this behaviour there might be multiple questions, why is it getting called twice? and that too only in development? and not in production?

<br />

Let's try to understand this with an example, and make a small app which implements following things:

- has an input number (_userId_) which can be incremented or decremented
- everytime _userId_ changes, api call is made to get and store _userName_
- display both _userId_ and _userName_

Now to make this work, I have made one mock function **api.fetchData** which takes _userId_ and returns _userName_. If _userId_ is even, it will return response after 300ms or else it will return after 600ms. I have kept the response return time variable since, api requests are async tasks and they can return response after variable time period depending upon network speed. Here is the code for that:

```js
const api = {
  fetchData(id) {
    return new Promise((resolve) => {
      let wait = id % 2 == 0 ? 300 : 600;
      setTimeout(() => {
        resolve(`User ${id}`);
      }, wait);
    });
  },
};
```

Now, let's implement the above requirements:

<iframe style="margin-bottom:20px;" class='sandbox-iframe' src='https://stackblitz.com/edit/react-ug4uuc?file=src/App.js'></iframe>

### problem with above approach

The above solution works, but if you have looked closely there is something wrong. If we try to change _userId_ quickly (eg: from 4 to 6), what happens is we get response for **userId 6 after 300ms** and for **userId 5 after 600ms**, and eventually the userName of userId 5 gets set even though our current userId is 6.

We can see this below-

<img style="width:100%;margin:10px 0;border-radius:4px;" src='https://user-images.githubusercontent.com/43666833/175782311-cb228613-b4c6-472c-bc55-1fabdc64e250.gif' alt='without-cleanup'>

We can see the problem in the above example, i.e. even when the _userId 5_ component instance was unmounted but it was still setting the data. These kinds of issues may arise if we don't maintain the cleanup function.

According to <a href='https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data' target="_blank">React Docs</a>, "If your Effect fetches something, the cleanup function should either abort the fetch or ignore its result"

<br/>

### let's fix this problem by adding a cleanup function

We can create a variable (done) and initialize it as false and on unmount we can change its value to true, and we can check value of done before updating the state.

<iframe class='sandbox-iframe' src='https://stackblitz.com/edit/react-gdpuek?embed=1&file=src/App.js'></iframe>

And, let's check how it solves our problem:

<img style="width:100%;margin:10px 0;border-radius:4px;" src='https://user-images.githubusercontent.com/43666833/175784120-be1c305a-0529-43d5-9bcd-41a6d8c0666f.gif' alt='with-cleanup'>

### But why does React runs useEffect(fn, []) runs twice

With the above example, we can see the importance of cleanup function in our react code. Same is helpful when we are dealing with connection, subscriptions, event listeners etc... but often time devs can miss to handle such conditions.
To help the developer notice such issues, **React 18 (StrictMode) remounts the component once after initial mount** (in development only), which helps in identifying such issues and further fix them by adding required cleanup function.
