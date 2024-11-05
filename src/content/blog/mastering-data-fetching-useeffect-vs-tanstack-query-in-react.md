---
author: Yug Jadvani
pubDatetime: 2024-08-31T22:46:09Z
title: Mastering Data Fetching useEffect vs. TanStack Query in React
slug: mastering-data-fetching-useeffect-vs-tanstack-query-in-react
featured: false
draft: false
tags:
  - React Query
  - Useeffect
  - Tanstack Query
  - Caching
  - Error Handling
description: TanStack Query provides a cleaner, more efficient way to fetch data in React applications.
image: ./images/tanstack-query.webp
---

In this article, we’ll explore two approaches for fetching data in a React application: the traditional useEffect hook combined with axios, and the more modern TanStack Query library. We’ll discuss the advantages of using TanStack Query, provide code examples, and delve into why it’s a powerful alternative.

## Table of contents

## 1. Traditional Approach: useEffect with Axios

Let’s start with the familiar method of using useEffect and axios to fetch data from an API. Suppose we want to retrieve a list of todos from the following API: JSONPlaceholder.

Purpose: The `useEffect` hook is traditionally used for handling side effects in React applications, including data fetching.

Challenges:

- Manually managing loading, error, and caching states.
- Handling complex scenarios like canceling requests, updating component state, and caching.

Install axios:

- Using npm: `npm install axios`
- Using yarn: `yarn add axios`

Example:

```typescript
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface ErrorResponse {
  message: string;
}

const FetchUseEffect: React.FC = () => {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err: ErrorResponse) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default FetchUseEffect;
```

## 2. Modern Approach: TanStack Query

Purpose: TanStack Query is a powerful alternative for data fetching in React. It simplifies complex tasks associated with fetching data.

Install TanStack Query:

- Using npm: `npm install @tanstack/react-query`
- Using yarn: `yarn add @tanstack/react-query`

Advantages:

- Automatic caching of data.
- Clear error handling.
- Query management for complex data dependencies.
- Efficient data updates.

Example:

```typescript
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const FetchUseQuery: React.FC = () => {
  const fetchTodos = (): Promise<Todo[]> =>
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.data);

  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;
  if (axios.isAxiosError(error)) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data && data.map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  );
};

export default FetchUseQuery;
```

## Wrapping the App

React Query, formerly known as TanStack Query, is a powerful data-fetching library for web applications. It simplifies fetching, caching, synchronizing, and updating server state. Unlike traditional state management libraries, React Query specifically focuses on handling server state challenges.

Modify your `main.tsx` (or equivalent) to wrap the app in the react-query client:

Example:

```typescript
// App.tsx

import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FetchUseQuery from './FetchUseQuery';
import FetchUseEffect from './FetchUseQuery';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <FetchUseQuery />
    <FetchUseEffect />
  </QueryClientProvider>
);

export default App;
```

Pros of this approach:

- **Simplified Data Fetching useQuery** abstracts away much of the boilerplate code required for handling data fetching.
- **Declarative and Intuitive:** Define queries in a declarative and intuitive way.
- **Automatic Caching and Refetching:** react-query handles caching and automatic refetching out of the box.

---

## QueryDevtools and TypeScript

Don’t forget to explore the QueryDevtools for debugging and monitoring queries during development. It’s especially useful when working with TypeScript.

Install TanStack Query Devtools

**Using npm:** `npm install @tanstack/react-query-devtools`

**Using yarn:** `yarn add @tanstack/react-query-devtools`

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App: React.FC = () => (
    return (
        <QueryClientProvider client={queryClient}>
            {/* Your app components */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
```

## Devtools Options

- `initialIsOpen`: Set to `true` if you want the devtools to default to being open.
- `buttonPosition`: Position of the React Query logo toggle (e.g., `"top-left"`, `"bottom-right"`).
- `position`: Position of the devtools panel (e.g., `"top"`, `"bottom"`).
- `client`: Use a custom `QueryClient`.
- `errorTypes`: Predefine query errors.

## Floating Mode

- Mounts the devtools as a fixed, floating element in your app.
- Provides a toggle button to show/hide the devtools.
- Toggle state is stored in `localStorage`.

---

## Conclusion

TanStack Query provides a cleaner, more efficient way to fetch data in React applications. Consider using it for your next project to simplify data fetching and improve developer experience.

For more in-depth information, check out the full article on [TanStack Router](https://tanstack.com/router/latest).

Happy querying! 🚀

---

> Enjoyed the read? If you found this article insightful or helpful, consider supporting my work by buying me a coffee. Your contribution helps fuel more content like this. [Click here](https://buymeacoffee.com/yugjadvani9) to treat me to a virtual coffee. Cheers!
