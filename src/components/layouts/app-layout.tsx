import { Outlet } from "react-router-dom";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
