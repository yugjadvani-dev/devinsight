---
author: Yug Jadvani
pubDatetime: 2024-09-04T03:22:24Z
title: Navigating the JavaScript Maze - Understanding ?? vs || with a Real-Life Tale
slug: navigating-the-javascript-maze-understanding-vs-with-a-real-life-tale
featured: false
draft: false
tags:
  - JavaScript
  - Webdevelopment
  - Jsoperators
description: Once upon a time, in the bustling world of tech startups, two developers, Maya and Arjun, were tasked with building a dynamic user interface for a new product.
image: ./images/code10.webp
---

## Table of contents

## The Tale of Two Developers: A Story of Misunderstandings

Once upon a time, in the bustling world of tech startups, two developers, Maya and Arjun, were tasked with building a dynamic user interface for a new product. They were both seasoned in JavaScript, but there was one challenge that often caused confusion: handling default values when variables were `null` or `undefined`.

One day, while working on a feature to display user preferences, Arjun used the logical OR operator (`||`) to assign a default value if the user's preference was not set. Maya, on the other hand, had just learned about the nullish coalescing operator (`??`) and decided to use it instead. Little did they know, this seemingly small difference would lead to a big lesson in JavaScript nuances.

## The `||` Operator: A Double-Edged Sword

The logical OR operator (`||`) is a classic tool in JavaScript, widely used to provide default values. It works by evaluating the left-hand side of the expression, and if that value is "falsy" (i.e., values like `false`, `0`, `''`, `null`, `undefined`, or `NaN`), it returns the right-hand side.

```javascript
let userPreference = "";
let defaultPreference = "dark mode";

let theme = userPreference || defaultPreference;
console.log(theme); // Output: "dark mode"
```

In this example, since `userPreference` is an empty string (a falsy value), the `||` operator returns `defaultPreference`.

This works well most of the time, but it can cause unexpected behavior. Imagine a situation where a user actually prefers an empty string as their input, or `0` as their preferred number. The `||` operator would override these values, leading to potential bugs.

## The `??` Operator: The New Kid on the Block

Enter the nullish coalescing operator (`??`). This operator, introduced in ECMAScript 2020, offers a more refined approach. It only considers `null` and `undefined` as "nullish" values and ignores other falsy values like `0` or an empty string.

```javascript
let userPreference = "";
let defaultPreference = "dark mode";

let theme = userPreference ?? defaultPreference;
console.log(theme); // Output: ""
```

Here, the `??` operator recognizes that an empty string is a valid, intentional value, so it doesn’t override it with the default.

## Arjun’s Dilemma: When `||` Isn’t Enough

Back to our story. Arjun had set up the user interface with `||`, assuming it would only fall back to the default if the preference was `null` or `undefined`. However, one day, a user reported a bug: they couldn’t set their preferred theme to an empty string. The interface always reverted to the default "dark mode," regardless of their choice.

Confused, Arjun dug into the code and realized that `||` was treating the empty string as falsy, thus always returning the default value. This is when Maya stepped in with her newfound knowledge of `??`.

## Maya’s Insight: `??` to the Rescue

Maya explained that `??` would have preserved the user’s preference, even if it was an empty string. They quickly refactored the code:

```javascript
let theme = userPreference ?? defaultPreference;
```

This small change fixed the bug, and the user was finally able to set their preferences as intended. The experience was a turning point for Arjun, who realized that while `||` had its place, `??` offered a safer alternative for specific use cases.

## A Deep Dive into `??` vs `||`

Now that we’ve seen the real-life implications, let’s break down the technical differences.

### `||` Operator:

- Evaluates the left-hand side.
- If it’s falsy (`false`, `0`, `''`, `null`, `undefined`, `NaN`), returns the right-hand side.
- Great for simple fallbacks but can lead to unintended behavior with valid falsy values.

### `??` Operator:

- Evaluates the left-hand side.
- If it’s `null` or `undefined`, returns the right-hand side.
- Ideal for cases where you want to preserve valid falsy values like `0` or `''`.

## Practical Examples

1. **Default Value for User Input:**

```javascript
let userInput = 0;
let defaultInput = 5;

let value = userInput || defaultInput; // Output: 5 (unintended)
let safeValue = userInput ?? defaultInput; // Output: 0 (intended)
```

2. **Handling Configuration Options:**

```javascript
let config = {
  mode: "dark",
  showSidebar: false,
};

let sidebarSetting = config.showSidebar || true; // Output: true (unintended)
let safeSidebarSetting = config.showSidebar ?? true; // Output: false (intended)
```

## Conclusion: Choose Wisely

Understanding the subtle differences between `||` and `??` can save you from frustrating bugs and ensure that your code behaves as expected. The key takeaway? Use `||` when you want to account for all falsy values, but reach for `??` when you only care about `null` or `undefined`.

As developers, we often navigate complex codebases where even a small operator can have a significant impact. By mastering these tools, we can write cleaner, more reliable code — just like Maya and Arjun learned on their journey.

So, the next time you’re deciding between `||` and `??`, remember the tale of two developers and the lesson they learned. It might just save you from a debugging session of your own.

---

> Enjoyed the read? If you found this article insightful or helpful, consider supporting my work by buying me a coffee. Your contribution helps fuel more content like this. [Click here](https://buymeacoffee.com/yugjadvani9) to treat me to a virtual coffee. Cheers!
