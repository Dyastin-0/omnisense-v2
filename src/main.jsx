import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/hooks/useToast.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { SettingsProvider } from "./hooks/useSettings.jsx";

import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./hooks/useData.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <SettingsProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </SettingsProvider>
  </ToastProvider>
);
