import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { initTranslation } from "./util/initTranslation";

const root = ReactDOM.createRoot(document.getElementById("root"));

initTranslation();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* themeProvider add theme={theme} */}
      <App />
    </Provider>
  </React.StrictMode>
);
