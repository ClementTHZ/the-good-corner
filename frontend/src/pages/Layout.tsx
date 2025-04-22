import { Outlet } from "react-router";
import Header from "../components/Header";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};
