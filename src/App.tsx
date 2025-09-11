import AppRoutes from "./routes";
import { useAnalytics } from "./hooks/use-analytics";
import { initAuthDebug } from "./lib/auth-debug";
import { useEffect } from "react";

function App() {
  // Initialize Google Analytics
  useAnalytics();

  // Initialize authentication debugging in production
  useEffect(() => {
    initAuthDebug();
  }, []);

  return <AppRoutes />;
}

export default App;
