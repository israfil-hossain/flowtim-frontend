import AppRoutes from "./routes";
import { useAnalytics } from "./hooks/use-analytics";

function App() {
  // Initialize Google Analytics
  useAnalytics();

  return <AppRoutes />;
}

export default App;
