import "./App.css";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./components/Sidebar.tsx";
import { Header } from "./components/Header.tsx";

function App() {
  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Header />
        {/*Page content from the router*/}
        <Outlet />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
