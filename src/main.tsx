import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import { Front } from "./pages/Front.tsx";
import { Products, ProductSearch } from "./pages/Products.tsx";
import { SortField, SortOrder } from "./hooks/useProducts.ts";

// Create a root route.
const rootRoute = createRootRoute({ component: App });

// List of routes. See RouteOptions type.
const routePaths = [
  { path: "/", component: Front },
  {
    path: "/products",
    component: Products,
    validateSearch: (search: Record<string, unknown>): ProductSearch => {
      // validate and parse the search params into a typed state
      return {
        page: Number(search.page) || undefined,
        limit: Number(search.limit) || undefined,
        search: (search.search as string) || undefined,
        minPrice: Number(search.minPrice) || undefined,
        maxPrice: Number(search.maxPrice) || undefined,
        inStock:
          search.inStock !== undefined ? Boolean(search.inStock) : undefined,
        sortField: (search.sortField as SortField) || undefined,
        sortOrder: (search.sortOrder as SortOrder) || undefined,
      };
    },
  },
];

const routes = routePaths.map((p) =>
  createRoute({ getParentRoute: () => rootRoute, ...p }),
);

// Create the route tree using routes.
const routeTree = rootRoute.addChildren(routes);

// Create the router using the route tree.
const router = new Router({
  routeTree,
  basepath: "/",
});

// Render our app!
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
