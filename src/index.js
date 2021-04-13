import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.css";
import Home from "./Home";
import Rider from "./Rider";

const { REACT_APP_STEPZEN_API_KEY, REACT_APP_STEPZEN_URI } = process.env;

const client = new ApolloClient({
  link: createHttpLink({
    credentials: "same-origin",
    headers: {
      Authorization: `Apikey ${REACT_APP_STEPZEN_API_KEY}`,
    },
    uri: REACT_APP_STEPZEN_URI,
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rider/:riderId" component={Rider} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
