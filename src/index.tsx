import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { client } from "./apollo";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
  rootElement
);
