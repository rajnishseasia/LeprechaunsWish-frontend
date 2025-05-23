import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./providers/provider.jsx";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster
        toastOptions={{
          style: {
            maxWidth: "600px",
          },
        }}
      />
    </Providers>
  </StrictMode>
);
