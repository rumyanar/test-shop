import { extractTitle } from "../lib.ts";
import { useMemo } from "react";
import { useRouterState } from "@tanstack/react-router";

export const Header = () => {
  const routerState = useRouterState();
  const title = useMemo(() => extractTitle(), [routerState]);

  return (
    <header className="bg-base-200 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  );
};
