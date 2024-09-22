---
author: Yug Jadvani
pubDatetime: 2024-09-22T17:11:41Z
title: How to Fix File-Based Metadata Issues in Next.js 14 for Dynamic Pages
slug: how-to-fix-file-based-metadata-issues-in-next-js-14-for-dynamic-pages
featured: false
draft: false
tags:
  - NextJs
  - SEO
description: Next.js 14 introduces exciting features for developers, including file-based metadata handling for SEO optimization.
image: ./images/seo.jpg
---

## Introduction

Next.js 14 introduces exciting features for developers, including file-based metadata handling for SEO optimization. However, when building a website, you may encounter issues with dynamic metadata not being applied correctly across different pages. One common problem is that all pages display the metadata of the homepage, even when navigating to other routes like the “About Us” page.

In this blog post, we’ll walk through the solution to resolve file-based metadata issues in Next.js 14 and ensure that each page displays its unique meta tags. Specifically, we’ll explore how to dynamically generate metadata using Next.js’ app router, ensuring that the correct title and description are shown for every page.

---

## Table of contents

## The Problem: Metadata Stuck on Homepage

In a typical Next.js project, developers set up `generateMetadata` to dynamically fetch metadata for pages based on the route. However, a common issue arises where only the homepage metadata is applied across all routes, including dynamic pages like "About Us." This happens when `params.slug` (the dynamic part of the URL) is either undefined or incorrectly passed in your page components.

In the following scenario, the `params.slug` was not properly handled, resulting in the homepage metadata being applied to both the homepage and other pages like "About Us."

### Example Code:

```typescript
// app/aboutus/page.tsx
import AboutUs from "@/components/(app)/aboutus";
import { generateMetadata } from "../layout";

export default async function AboutUsPage({ params }: { params: { slug?: string } }) {
  const slug = params?.slug || 'aboutus';
  const metadata = await generateMetadata({ params: { slug } });

  return (
    <>
      <AboutUs />
    </>
  );
}
```

```typescript
// app/page.tsx
import Home from "@/components/(app)/home";
import { generateMetadata } from "./layout";

export default async function HomePage({ params }: { params: { slug?: string } }) {
  const slug = params?.slug || '';
  const metadata = await generateMetadata({ params: { slug } });

  return <Home />;
}
```

In both pages, the `generateMetadata` function is called to retrieve metadata based on the `slug`. However, the issue occurs because `params.slug` is undefined, so the homepage metadata gets applied to all pages.

---

## The Solution: Ensure Proper Slug Handling

To resolve this, we need to ensure that each page passes a valid `slug` to the `generateMetadata` function. Additionally, we’ll adjust the `layout.tsx` to handle cases where `slug` is undefined or missing, and apply the correct metadata accordingly.

### Step 1: Define Metadata in Each Page

Ensure that each page properly defines and passes the `slug` when calling `generateMetadata`. This guarantees that the correct metadata is applied based on the route.

**Updated Code for app/aboutus/page.tsx:**

```typescript
import AboutUs from "@/components/(app)/aboutus";
import { generateMetadata } from "../layout";

export const metadata = async () => {
  return await generateMetadata({ params: { slug: 'aboutus' } });
};

export default function AboutUsPage() {
  return (
    <>
      <AboutUs />
    </>
  );
}
```

**Updated Code for app/page.tsx:**

```typescript
import Home from "@/components/(app)/home";
import { generateMetadata } from "./layout";

export const metadata = async () => {
  return await generateMetadata({ params: { slug: '' } });
};

export default function HomePage() {
  return <Home />;
}
```

---

### Step 2: Handle Undefined Slugs in Layout

In your `layout.tsx` file, update the `generateMetadata` function to handle cases where `params.slug` is undefined. This way, we can avoid applying incorrect metadata to other pages.

**Updated `layout.tsx` Code:**

```typescript
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug || ""; // Ensure slug is always a string
  const pathname = slug ? `/${slug}` : "/"; // Use '/' for home
  const metadata = metadataConfig[pathname as keyof typeof metadataConfig];

  if (!metadata) {
    return {
      title: "Default Title",
      description: "Default description.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}
```

With this fix, the `slug` is always checked, and if it's undefined, a fallback value is applied to ensure that the correct metadata is returned for each page.

---

### Step 3: Metadata Configuration

Ensure that your metadata configuration is properly set for each route, like the homepage and “About Us” page. Here’s an example of a simple metadata configuration object:

**Example Metadata Config:**

```typescript
export const metadataConfig = {
  "/": {
    title: "Home | Free Background Remove",
    description: "Home page of the best free background remover tool.",
    canonical: "https://www.freebackgroundremove.com/",
  },
  "/aboutus": {
    title: "About Us | Free Background Remove",
    description:
      "Learn more about the team behind the background remover tool.",
    canonical: "https://www.freebackgroundremove.com/aboutus",
  },
  "/contactus": {
    title: "Contact Us | Free Background Remove",
    description: "Get in touch with us for inquiries or support.",
    canonical: "https://www.freebackgroundremove.com/contactus",
  },
};
```

---

## Conclusion

By properly managing `params.slug` and ensuring that it’s correctly passed to the `generateMetadata` function, you can resolve issues with incorrect metadata being applied to different pages in your Next.js 14 application. This approach ensures that each page displays unique meta tags, enhancing SEO and user experience.

If you are working with dynamic metadata in Next.js, this guide should help you avoid common pitfalls and ensure your application’s metadata is correctly configured.

---

## SEO Optimized Key Takeaways:

- Fix file-based metadata issues in Next.js 14.
- Handle dynamic params.slug correctly in each page.
- Generate unique metadata for better SEO.
- Use a robust configuration for managing meta tags across multiple routes.

This post will help developers ensure that their Next.js websites display the correct metadata on each page, improving both SEO and user engagement.

---

This blog format explains the problem, the solution, and the steps involved to fix the issue, optimized with keywords like `Next.js 14, file-based metadata, dynamic routes,` and `SEO` to improve search rankings.

---

> Enjoyed the read? If you found this article insightful or helpful, consider supporting my work by buying me a coffee. Your contribution helps fuel more content like this. [Click here](https://buymeacoffee.com/yugjadvani9) to treat me to a virtual coffee. Cheers!
