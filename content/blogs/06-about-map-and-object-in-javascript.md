---
title: About Map and Object in Javascript
description:
slug: about-map-and-object-in-javascript
date: 30-Dec-2021
isTechBlog: true
---

In javascript to create key-value pairs we mostly use Object, but from and after ES6 we have a new data structure called Map which we seldom use. While Object was already solving the purpose of having a key-value pair, what was the need of this new data structure, which brings to the question of the difference between two.

<br />

Let's check the difference between the two under following criterias:

<br />

## Structure and Inter-relation

The data structure Map is made on top of Object, which means every map is an Object but vice versa is not true.
To confirm this, let's create a map and an object:

```js
const myMap = new Map();
const myObj = {};
```

Let's check the type hierarchy of myMap and myObj:

```js
/* myMap */
console.log(myMap.__proto__.constructor);
// [Function: Map]

console.log(myMap.__proto__.__proto__.constructor);
// [Function: Object]

console.log(myMap.__proto__.__proto_.__proto__.constructor);
// TypeError, since myMap.__proto__.__proto_.__proto__ is null

/* Object */
console.log(myObj.__proto__.constructor);
// [Function: Object]

console.log(myObj.__proto__.__proto__.constructor);
// TypeError, since myObj.__proto__.__proto_.__proto__ is null
```

So, the type hierarchy of myMap and myObj is as below:

<img src='https://user-images.githubusercontent.com/43666833/147595415-e968d2bd-db5d-4b52-8869-8a6c39eb3097.png' alt='map-object-type-hierarchy' style="margin:10px 0" >

We can further verify this-

```js
const myMap = new Map();
const obj = {};

console.log(myMap instanceof Map); // true
console.log(myMap instanceof Object); // true

console.log(obj instanceof Map); // false
console.log(obj instanceof Object); // true

console.log(Map instanceof Object); // true
console.log(Object instanceof Map); // false
```

<br />

## Types of keys

<br />

In Objects, the keys can be only of String or Symbol type, but in a Map a key can be number, string, boolean, object or a function. If we try to add key other than String or Symbol to an Object it automatically converts it into a string.

```js
const myMap = new Map();
const myObj = {};

myMap.set(1, "one");
myObj[1] = "one";

myMap.set(true, "truth");
myObj[true] = "truth";

myMap.set({ id: 1 }, "USER 1");
myObj[{ id: 1 }] = "USER 1";

const add = (a, b) => a + b;

myMap.set(add, "ADDER");
myObj[add] = "ADDED";

console.log([...myMap.keys()]);
// [ 1, true, { id: 1 }, [Function: add] ]

console.log(Object.keys(myObj));
// [ '1', 'true', '[object Object]', '(a, b) => a + b' ]
```

<br />

## Size of Map/Object

<br />

The size of a Map can be easily determined by the _size_ property available on it, where as in an Object, we need to get the array of entries or keys from which we can determine the size of object.

```js
const myMap = new Map();
const myObj = {};

myMap.set("name", "Akul");
myObj["name"] = "Akul";

console.log(myMap.size); // 1
console.log(Object.keys(myObj).length); // 1
```

But there is a catch here, _Object.keys_ function doesn't include Symbol keys. So if your object has Symbolic keys then it can give inconsistent results.

```js
const myMap = new Map();
const myObj = {};

myMap.set(Symbol(1), "one");
myObj[Symbol(1)] = "one";

console.log(myMap.size); // 1
console.log(Object.keys(myObj).length); // 0
```

A workaround to prevent this is

```js
const myObjKeys = [
  ...Object.getOwnPropertyNames(myObj),
  ...Object.getOwnPropertySymbols(myObj),
];

console.log(myObjKeys.length); // 1
```

<br />

## Performance

<br />

Let's check the performance of setting and getting information from Map and Object

<br />

### Performance Check: Adding data

To check the performance of adding key-value in Map and Object, we will set 500,000 keys into myMap and myObj and will check how much time does it take.

Following is the code for same.

<details>
    <summary>Code</summary>

```js
const performance = require("perf_hooks").performance;

const myMap = new Map();
const myObj = {};

const LIMIT = 500_000;

{
  /* myMap Performance Check */
  const startTime = performance.now(); /*TIMER START*/
  for (let i = 0; i < LIMIT; i++) {
    myMap.set(`key-${i}`, i);
  }
  const endTime = performance.now(); /*TIMER END*/
  console.log("myMap:", endTime - startTime, "ms");
}

{
  /* myObj Performance Check */
  const startTime = performance.now(); /*TIMER START*/
  for (let i = 0; i < LIMIT; i++) {
    myObj[`key-${i}`] = i;
  }
  const endTime = performance.now(); /*TIMER END*/
  console.log("myObj", endTime - startTime, "ms");
}
```

</details>

I have tried this performance test 10 times and results are following-

<details>
    <summary>Results</summary>

<img src='https://user-images.githubusercontent.com/43666833/147600533-a989e863-bad3-4a32-acec-342b1f8421cd.gif' alt='map-obj-set-results' style="margin: 10px 0"  >

</details>

<br />

### Performance Check: Getting data

I have modified the same above example and tried retrieving values from Map and Object in a loop. Following is the code for the same:

<details>
    <summary>Code</summary>

```js
const performance = require("perf_hooks").performance;

const myMap = new Map();
const myObj = {};

const LIMIT = 500_000;

for (let i = 0; i < LIMIT; i++) {
  myMap.set(`key-${i}`, i);
  myObj[`key-${i}`] = i;
}

{
  /* myMap Performance Check */
  const startTime = performance.now(); /*TIMER START*/
  for (let i = 0; i < LIMIT; i++) {
    const val = myMap.get(`key-${i}`);
  }
  const endTime = performance.now(); /*TIMER END*/
  console.log("myMap:", endTime - startTime, "ms");
}

{
  /* myObj Performance Check */
  const startTime = performance.now(); /*TIMER START*/
  for (let i = 0; i < LIMIT; i++) {
    const val = myObj[`key-${i}`];
  }
  const endTime = performance.now(); /*TIMER END*/
  console.log("myObj", endTime - startTime, "ms");
}
```

</details>

Following are the results of performance test of retrieving values from Map and Object.

<details>
    <summary>Results</summary>

<img src='https://user-images.githubusercontent.com/43666833/147602335-fa0e8775-079c-47b6-aa36-70f3efa1188e.gif' alt='map-obj-get-results' style="margin: 10px 0"  >

</details>

### Performance Results

<br />

<div class='table-wrapper'>

| S.No.    | myMap (set) | myObj (set) | myMap (get) | myObj (get) |
| -------- | ----------- | ----------- | ----------- | ----------- |
| 1        | 410.82      | 644.59      | 247.58      | 361.89      |
| 2        | 377.55      | 605.79      | 242.34      | 349.69      |
| 3        | 378.60      | 605.98      | 251.62      | 353.92      |
| 4        | 376.67      | 604.45      | 236.87      | 357.02      |
| 5        | 376.27      | 608.50      | 245.19      | 353.43      |
| 6        | 387.21      | 597.69      | 266.44      | 348.19      |
| 7        | 385.24      | 597.65      | 245.43      | 351.23      |
| 8        | 386.33      | 591.41      | 246.49      | 358.33      |
| 9        | 395.12      | 616.21      | 240.15      | 351.28      |
| 10       | 376.89      | 673.43      | 249.47      | 351.30      |
| -------- | ---------   | ---------   | ----------  | ---------   |
| Average  | 385.06      | 614.56      | 247.15      | 353.62      |

</div>

<br />

**Note:** All the above values are in milliseconds

<br />

## When to use?

- **Map**: It can be a better option than using objects in cases where frequent adding and retrieving of data is needed. In those cases, map can perform better which is evident by above results. Also if we need to maintain the order of keys, it is best to use Map even though Objects (now) also maintain key order but it doesnt guarantee that.
- **Object**: In the cases where data is not frequently updated we can still use Object for its more familiar syntax. Also, it supports native methods for serialization and parsing, which makes it a better option in those cases (eg. sending body while making an API request) as well.
