import { AppRouter } from "./router";
import { GlobalLoading } from "@/components/ui/global-loading";
import { Toaster } from "sonner";

export function App() {
  return (
    <>
      <AppRouter />
      <GlobalLoading />
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            padding: "16px",
          },
        }}
      />
    </>
  );
}
