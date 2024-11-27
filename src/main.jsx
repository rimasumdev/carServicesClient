import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes/Routers.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import QueryClients from "./QueryClient/QueryClient.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClients>
        <RouterProvider router={router} />
      </QueryClients>
    </AuthProvider>
  </StrictMode>
);
