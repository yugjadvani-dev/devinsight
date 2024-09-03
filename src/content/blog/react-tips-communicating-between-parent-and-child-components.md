---
author: Yug Jadvani
pubDatetime: 2024-09-03T03:08:50Z
title: React Tips - Communicating Between Parent and Child Components
slug: react-tips-communicating-between-parent-and-child-components
featured: true
draft: false
tags:
  - Webdevelopment
  - Codingtips
  - Reacttutorial
  - Reactjs
  - Components
description: In React, one of the common challenges developers face is communication between parent and child components.
image: ./images/parent-child.webp
---

In React, one of the common challenges developers face is communication between parent and child components. This can be particularly tricky when you need the parent component to react to changes triggered by the child component, such as a button click. In this post, we’ll explore how to manage this scenario effectively using props, state, and the `useEffect` hook.

## Table of contents

## Scenario

Imagine you have a parent component that needs to perform some action whenever a button in its child component is clicked. To accomplish this, you need a way for the child component to send data to the parent component. This data can then be used within a `useEffect` hook in the parent component to trigger further actions or updates.

## Step-by-Step Solution

We’ll break down the solution into two main parts: the parent component and the child component.

1. Parent Component

The parent component will hold the state that needs to be updated based on the child’s actions. It will also pass a function to the child component to allow it to send data back to the parent..

```typescript
import React, { useState, useEffect } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent: React.FC = () => {
  const [childValue, setChildValue] = useState<string | null>(null);

  const handleChildValue = (value: string) => {
    setChildValue(value);
  };

  useEffect(() => {
    if (childValue !== null) {
      // Your condition and logic here
      console.log('Child value has changed:', childValue);
    }
  }, [childValue]);

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent onButtonClick={handleChildValue} />
    </div>
  );
};

export default ParentComponent;
```

In this parent component:

- We define a state variable `childValue` to store the value received from the child.
- The function `handleChildValue` updates `childValue` and is passed to the child component as a prop.
- The `useEffect` hook listens for changes to `childValue` and executes any necessary logic when it changes.

---

2. Child Component

The child component will receive the function from the parent as a prop and call this function when the button is clicked.

```typescript
import React from 'react';

interface ChildComponentProps {
  onButtonClick: (value: string) => void;
}

const ChildComponent: React.FC<ChildComponentProps> = ({ onButtonClick }) => {
  const handleClick = () => {
    const value = 'some value'; // This value can be anything you need
    onButtonClick(value);
  };

  return (
    <div>
      <h2>Child Component</h2>
      <button onClick={handleClick}>Send Value to Parent</button>
    </div>
  );
};

export default ChildComponent;
```

In this child component:

- We receive the `onButtonClick` function as a prop.
- When the button is clicked, `handleClick` is executed, which calls `onButtonClick` with a value, thereby sending data back to the parent.

## How It Works

1. **Button Click:** When the button in the `ChildComponent` is clicked, it triggers the `handleClick` function.
2. **Prop Function Call:** The `handleClick` function calls `onButtonClick` with a value, sending this value to the parent component.
3. **State Update:** The parent component’s `handleChildValue` function updates the `childValue` state with the received value.
4. **Effect Hook:** The `useEffect` hook in the parent component detects the change in `childValue` and executes the specified logic.

---

## Conclusion

By following this approach, you can easily manage communication between parent and child components in React. Passing functions as props and utilizing state and the `useEffect` hook allows for a clean and efficient way to handle events and updates across components. This pattern is fundamental in React and can be applied to various scenarios where inter-component communication is necessary.

---

> Enjoyed the read? If you found this article insightful or helpful, consider supporting my work by buying me a coffee. Your contribution helps fuel more content like this. [Click here](https://buymeacoffee.com/yugjadvani9) to treat me to a virtual coffee. Cheers!