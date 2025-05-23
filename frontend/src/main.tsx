import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

import "./index.css";
import { App } from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5050", // => Apollo Client se connecte au backend Docker via localhost:5050 (port 3000 exposé côté docker)
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
