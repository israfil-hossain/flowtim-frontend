import AppRoutes from "./routes";
import { useAnalytics } from "./hooks/use-analytics";
import { initAuthDebug } from "./lib/auth-debug";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  // Initialize Google Analytics
  useAnalytics();

  // Initialize authentication debugging in production
  useEffect(() => {
    initAuthDebug();
  }, []);

  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
