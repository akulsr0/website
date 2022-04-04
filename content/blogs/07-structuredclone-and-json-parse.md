---
title: structuredClone and json.parse(...)
description:
slug: structuredclone-and-json-parse
date: 04-Apr-2022
isTechBlog: true
---

Javascript is a language of objects, and when we talk about objects there are terms like shallow copy/clone and deep copy/clone.

- **shallow copy/clone:** A copy of an object, where both the object properties values' share same reference is called as <em>shallow copy</em>.

So, if we have an object <em>user</em> and we create a shallow copy of it - <em>userCopy</em> then if we update properties on <em>userCopy</em> object it will be updated on both the objects since they share the same reference.
<br/>

```javascript
const user = { name: "Akul" };
const userCopy = user;
console.log(user, userCopy); // {name: 'Akul'} {name: 'Akul'}
userCopy.name = "John";
console.log(user, userCopy); // {name: 'John'} {name: 'John'}
```

Same happens with arrays also since array is also an object in javascript.

```javascript
const arr = [1, 2, 3, 4, 5];
const arrCopy = arr;
arrCopy[2] = "three";
console.log(arr, arrCopy); // [1, 2, 'three', 4, 5] [1, 2, 'three', 4, 5]
delete arrCopy[0];
console.log(arr, arrCopy); // [empty, 2, 'three', 4, 5] [empty, 2, 'three', 4, 5]
```

- **deep copy/clone:** A copy of an object, where both the object properties values' have different reference is called as <em>deep copy</em>.

If we update a property on a deep copy it will be updated only on the copy object.

```javascript
const m = { name: "Alice" };
const n = JSON.parse(JSON.stringify(m));
console.log(m, n); // {name: 'Alice'} {name: 'Alice'}
n.name = "Bryce";
console.log(m, n); // {name: 'Alice'} {name: 'Bryce'}
```

Now there are multiple ways to create deep copy of an object, out of which two popular ways are:

- **JSON.parse(JSON.stringify(obj))**: We can stringify an object and then parse it to create a deep copy of that object. As shown in the above example.
  <br/><br/>
- **structuredClone(obj)**: It is a method which is available to us in most of the common browsers and nodejs through which we can create deep copy of an object.

```javascript
const user = { name: "Akul" };
const userCopy = structuredClone(user);
console.log(userm, userCopy); // {name: 'Akul'} {name: 'Akul'}
userCopy.name = "Elon";
console.log(user, userCopy); // {name: 'Akul'} {name: 'Elon'}
```

Let's analyze the performance of both ways by having an array of 5000 objects and creating its deep copy using above ways.

```javascript
const x = Array(50000)
  .fill(1)
  .map((e, i) => ({ [i]: i + 1 }));

console.time("structuredClone");
const copy1 = structuredClone(x);
console.timeEnd("structuredClone");

console.time("json");
const copy2 = JSON.parse(JSON.stringify(x));
console.timeEnd("json");
```

We have ran the above code 5 times and here are the results.

![perf](https://user-images.githubusercontent.com/43666833/161556075-6cf02f85-db2c-4b0d-846e-2a971b59bc22.gif)

<div class='table-wrapper'>

| No.     | structuredClone() | JSON.parse(JSON.stringify()) |
| ------- | ----------------- | ---------------------------- |
| 1       | 97.93             | 86.94                        |
| 2       | 62.18             | 48.81                        |
| 3       | 83.01             | 52.13                        |
| 4       | 61.11             | 45.30                        |
| 5       | 60.97             | 50.27                        |
| Average | 73.04             | 56.69                        |

</div>

<br/>

From the above results, we can see that **JSON.parse(JSON.stringify(...))** way is faster than the structuredClone() method for larger objects.

Then the question arises, why did we needed **structuredClone()** method, we could have use the other way and it's also performance efficient.

<br/>

Let's take an example to see the drawback of JSON.parse(JSON.stringify(...)) and need of structuredClone() method.

```javascript
const user = { name: "Akul" };
user.self = user;
const userCopy1 = JSON.parse(JSON.stringify(user)); // throws Error (TypeError: Converting circular structure to JSON)
const userCopy2 = structuredClone(user); // {name: 'Akul', self: {...}}
```

The reason it throws error is we cannot stringify a circular object. In these cases, we can use **structuredClone()** to create deep copy of an object which is cyclic.
