---
title: Better way to conditional render in React
category: react
date: 1-Sept-2022
---

### Conditional Rendering

In React or in web general, often times we have the usecase where we need to render some component depending on some condition. For example, suppose we have a number and if that number is even we want to render Even component else Odd component. Generally, devs will do it in the following way-

```js
const Even = () => <h3>Even</h3>;
const Odd = () => <h3>Odd</h3>;

export default function App() {
  const n = 1;

  return (
    <div>
      <h1>Hello Conditionals</h1>
      {n % 2 === 0 ? <Even /> : <Odd />}
    </div>
  );
}
```

In the above example, you can see it works well, but its not the cleanest looking snippet of jsx code. It can look more unpleasant if we are passing multiple props. However, we can fix this by creating another component which will the take condition and what to render as props.

```js
// Implementation
const Conditional = (props) => {
  const { condition, renderOnTruthy, renderOnFalsy } = props;
  return condition ? renderOnTruthy : renderOnFalsy;
};

// Usage
<Conditional
  condition={n % 2 === 0}
  renderOnTruthy={<Even />}
  renderOnFalsy={<Odd />}
/>;
```

<br/>

#### Nested Ternaries

Let's take an example of nested ternary rendering and see if we can make it clean as well. Following is an example of rendering Even, Prime and Odd component on the basis of what the number is.

```js
export default function App() {
  const n = 5;

  return (
    <div>
      <h1>Hello Conditionals</h1>
      {n % 2 === 0 ? (
        // Condition 1
        <Even />
      ) : isPrime(n) ? (
        // Condition 2
        <Prime />
      ) : (
        // Else
        <Odd />
      )}
    </div>
  );
}
```

In order to make a clean solution for this, we can take a double dimensional array of conditions and each condition will have the condition itself and corresponding component which need to be render if that condition is truthy. We will also need a default component if all the conditions are falsy.

<br />

**Note:** The order of the conditions array is important, the first truthy condition inside it will render corresponding component.

<br />

Here's the implementation and usage for the same.

```js
// Implementation
const Conditional = (props) => {
  const {
    condition,
    renderOnTruthy,
    renderOnFalsy,
    conditions,
    defaultForConditions,
  } = props;
  if (conditions && conditions.length > 0) {
    let result = defaultForConditions;
    for (let cond of conditions) {
      const [condition, component] = cond;
      if (condition) {
        result = component;
        break;
      }
    }
    return result;
  }
  return condition ? renderOnTruthy : renderOnFalsy;
};

// Usage
<Conditional
  conditions={[
    [n % 2 === 0, <Even />],
    [isPrime(n), <Prime />],
  ]}
  defaultForConditions={<Odd />}
/>;
```
