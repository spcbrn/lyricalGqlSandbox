import "./style/style.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import axios from "axios";
// import ApolloClient from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// // import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { store } from "./gql/store";

import App from "./components/App";
import SongCreate from "./components/SongCreate";
import SongList from "./components/SongList";
import SongDetail from "./components/SongDetail";

// const client = new ApolloClient({
//   cache: new InMemoryCache({
//     dataIdFromObject: o => o.id
//   }),
//   link: new HttpLink()
// });

const Root = () => {
  return (
    // <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </Provider>
    // </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
