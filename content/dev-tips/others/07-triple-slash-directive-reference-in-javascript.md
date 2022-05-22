---
title: Triple Slash Directive Reference in Javascript
category: others
date: 22-May-2022
---

One of the major advantage of using TypeScript over JavaScript is we get auto suggestions while development. But let's suppose we have a Vanilla Javascript project and we want to have type suggestions on that project. We can do that by using triple slash directive reference and creating an type declaration (.d.ts) file.

<br />

Here's how we can do that:

<br />

Create a type declaration file for your project. In this file, you need to have all the type, function, modules declarations. We keep these declarations in a special type of file which has **.d.ts** extension.

<img style="object-fit: cover;max-width: 100%;object-position: center;margin:10px 0" src='https://user-images.githubusercontent.com/43666833/169703550-db19461a-a962-442c-911c-5dbfdee35dad.png' alt='' >

After that, we need to add reference to the type declaration file in our Javascript file. We can do it by adding following line at the top of the javascript file. If you have multiple references, you can add one by one but it needs to be at the top of the code.

```javascript
/// <reference path='math.d.ts' />
```

Now we can see we have type suggestions for our code.

<img style="object-fit: cover;max-width: 100%;object-position: center;margin:10px 0"  src='https://user-images.githubusercontent.com/43666833/169704186-31293204-85e8-433d-ac9b-21ea55a34ac2.png' alt='' >

**Note:** This can only help in giving suggestions as per our type declarations and will not enforce you to write strictly typed code. For example: If I try to read any other property than available ones' on _circleDetails_, it won't restrict me in doing so, which is the case in TypeScript.
