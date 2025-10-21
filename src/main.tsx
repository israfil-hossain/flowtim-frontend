import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";

import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./context/query-provider.tsx";
import { AuthProvider } from "./context/auth-provider.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
