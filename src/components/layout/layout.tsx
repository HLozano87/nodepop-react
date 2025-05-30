import { Outlet } from "react-router";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout = () => {
  return (
    <div className="flex h-full flex-col bg-gray-50">
      <Header />

      <div className="mx-auto w-full max-w-5xl flex-grow px-6 py-8">
        <Outlet/>
      </div>

      <Footer />
    </div>
  );
};
