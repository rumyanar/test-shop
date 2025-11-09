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
import { Products } from "./pages/Products.tsx";

// Create a root route.
const rootRoute = createRootRoute({ component: App });

// List of routes. See RouteOptions type.
const routePaths = [
  { path: "/", component: Front },
  { path: "/products", component: Products },
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
