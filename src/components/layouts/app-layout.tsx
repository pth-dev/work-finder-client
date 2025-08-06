import { Outlet } from "react-router-dom";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts";
import { ScrollToTop } from "@/components";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
