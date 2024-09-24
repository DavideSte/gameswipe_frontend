import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "@/core/styles/index.css";

import "react-lazy-load-image-component/src/effects/blur.css";
import { setupStore } from "./core/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </StrictMode>
);
