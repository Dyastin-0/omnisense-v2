import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/hooks/useToast.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { SettingsProvider } from "./hooks/useSettings.jsx";

import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./hooks/useData.jsx";
import { ModalProvider } from "./components/hooks/useModal.jsx";

createRoot(document.getElementById("root")).render(
  <SettingsProvider>
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <ModalProvider>
            <BrowserRouter basename="/v2">
              <App />
            </BrowserRouter>
          </ModalProvider>
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  </SettingsProvider>
);
