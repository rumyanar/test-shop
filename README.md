# Work notes

## Overview
The site uses React + Vite setup with Daisy UI and TailwindCSS for easy styling.

## Data retrieval
At first, I considered [fakeapi.net](https://fakeapi.net) as it fits the requirements for filtering, sorting and product count, but it does not contain real product images, so I chose [fakestoreapi.com](https://fakestoreapi.com) instead, even though it has only 20 items. Then I replaced it with data from [dummyjson.com](https://dummyjson.com).

## Site navigation
Application state (filters, sorting, pagination) stored in URL search parameters with type-safe validation via TanStack Router.

## Animations
Used Framer Motion package for easy animations on the product list.

## Video

[![Watch the video](https://img.youtube.com/vi/A7tn3YOCdfg/0.jpg)](https://www.youtube.com/watch?v=A7tn3YOCdfg)

https://www.youtube.com/watch?v=A7tn3YOCdfg

# Installation

The project uses pnpm as a package manager. To install dependencies and run the project, use the following commands:

```bash
pnpm install
pnpm run dev
```
