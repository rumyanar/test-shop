import "./App.css";
import { Outlet } from "@tanstack/react-router";
import { Header } from "./components/Header.tsx";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
