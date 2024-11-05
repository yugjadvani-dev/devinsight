---
author: Yug Jadvani
pubDatetime: 2024-11-05T04:21:32Z
title: A Deep Dive into new and this in JavaScript - Unlocking the Power of Object-Oriented Programming
slug: a-deep-dive-into-new-and-this-in-javascript-unlocking-the-power-of-object-oriented-programming
featured: false
draft: false
tags:
  - javascript
description: JavaScript is a powerful, flexible language with roots in functional programming and capabilities for object-oriented programming (OOP). Two critical concepts that lie at the heart of OOP in JavaScript are new and this.
image: ./images/new-this.jpg
---

JavaScript is a powerful, flexible language with roots in functional programming and capabilities for object-oriented programming (OOP). Two critical concepts that lie at the heart of OOP in JavaScript are `new` and `this`. While these keywords may seem straightforward, they have nuances that can be challenging to master, even for experienced developers. In this blog post, we’ll take a deep dive into the workings of `new` and `this` in JavaScript, breaking down their behaviors with examples and best practices.

---

## Table of Contents

## Introduction to `this` in JavaScript

At its core, `this` is a context-dependent keyword that refers to the object from which a function is called. Unlike some other languages where `this` is statically bound, in JavaScript, the value of `this` can change depending on how and where a function is invoked.

In simple terms:

- **Global Scope**: In the global context (or non-strict mode), `this` refers to the global object (`window` in browsers, `global` in Node.js).
- **Inside Methods**: Within an object method, `this` refers to the object that owns the method.
- **Event Handlers**: In event listeners, `this` typically refers to the element that triggered the event.

We will explore these contexts with examples later in the blog.

---

## Understanding `new` in JavaScript

The `new` keyword in JavaScript is used to create instances of user-defined objects or built-in objects like `Date`, `Array`, etc. When you use `new` with a constructor function, it creates a new object and binds `this` to that object, essentially linking it to a prototype.

**For example:**

```javascript
function Car(make, model) {
  this.make = make;
  this.model = model;
}

const myCar = new Car("Tesla", "Model 3");
console.log(myCar); // { make: 'Tesla', model: 'Model 3' }
```

**When `new` is used:**

1. A new empty object is created.
2. The `this` keyword inside the constructor is set to reference this new object.
3. The function executes its code and assigns properties to `this`.
4. The object is linked to the constructor’s prototype, enabling inheritance.
5. The function returns `this` unless an object is returned explicitly.

---

## How `new` Works Under the Hood

Let's simulate the behavior of `new` using a custom function:

```javascript
function simulateNew(constructor, ...args) {
  const obj = {}; // Step 1: Create a new empty object
  Object.setPrototypeOf(obj, constructor.prototype); // Step 2: Link the object to the constructor's prototype
  const result = constructor.apply(obj, args); // Step 3: Bind this and execute the constructor
  return result instanceof Object ? result : obj; // Step 4: Return the object
}

function Person(name) {
  this.name = name;
}

const john = simulateNew(Person, "John Doe");
console.log(john.name); // John Doe
```

This function follows the same steps as the `new` keyword, demonstrating the behind-the-scenes mechanics.

---

## Examples of `this` in Various Contexts

1. **Global Context**

In the global context (non-strict mode), `this` refers to the global object (`window` in browsers).

```javascript
console.log(this === window); // true

function showThis() {
  console.log(this); // window
}

showThis();
```

In strict mode (`'use strict';`), `this` is `undefined` in the global context:

```javascript
"use strict";

function showThis() {
  console.log(this); // undefined
}

showThis();
```

2. **Object Method Context**

When `this` is used inside an object method, it refers to the object that owns the method.

```javascript
const person = {
  name: "Alice",
  greet() {
    console.log(this.name); // 'Alice'
  },
};

person.greet();
```

Here, `this` refers to the `person` object because it’s the context in which the `greet` method is called.

3. **Constructor Function Context**

In a constructor function, `this` refers to the newly created object.

```javascript
function Animal(type) {
  this.type = type;
}

const dog = new Animal("Dog");
console.log(dog.type); // Dog
```

4. **Event Handler Context**
   In event handlers, `this` refers to the DOM element that triggered the event.

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log(this); // the button element
});
```

When using arrow functions in event listeners, `this` is lexically bound and does not refer to the element:

```javascript
button.addEventListener("click", () => {
  console.log(this); // refers to the outer scope (e.g., window)
});
```

---

## Best Practices and Common Pitfalls

1. **Arrow Functions and `this`**: Arrow functions do not bind their own `this`; instead, they inherit `this` from the surrounding lexical context. This can be useful in situations like event handlers or callbacks where you want to maintain a reference to the parent scope.

```javascript
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

const myTimer = new Timer(); // Correctly logs the seconds count
```

2. **Explicit Binding with `.call()`, `.apply()`, and `.bind()`**: You can manually control the value of `this` using these methods. For example:

```javascript
function greet() {
  console.log(this.name);
}

const person = { name: "John" };
greet.call(person); // John
```

3. **Avoid using `this` in global functions**: It’s generally a good practice to avoid `this` in global functions, as it can lead to unexpected behaviors, especially in strict mode.

4. **Class Syntax**: Since ES6, using the class syntax provides a more intuitive way to define constructor functions with `this` and `new`.

```javascript
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

const myCar = new Car("BMW", "X5");
console.log(myCar.make); // BMW
```

---

## Conclusion

The `new` and `this` keywords play a pivotal role in JavaScript's object-oriented paradigm, allowing for the creation and management of objects and their behavior. Understanding how `this` works in different contexts and how `new` constructs instances of objects is crucial for writing robust, scalable JavaScript code. By mastering these concepts, you can avoid common pitfalls and write cleaner, more maintainable code.

Keep experimenting and writing examples to solidify your understanding of these core JavaScript concepts!

---

> Enjoyed the read? If you found this article insightful or helpful, consider supporting my work by buying me a coffee. Your contribution helps fuel more content like this. [Click here](https://buymeacoffee.com/yugjadvani9) to treat me to a virtual coffee. Cheers!
