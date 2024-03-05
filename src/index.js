import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let persistor = persistStore(store);
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <ThemeProvider>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </PersistGate>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
