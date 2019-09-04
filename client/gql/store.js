import { createStore, applyMiddleware } from "redux";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./reducer";

export const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

/**
 * TO DO:
 *  - use typename on queries to map appropriate state as data DONE
 *  - register the queries in a matp object as they are redux actions under the hood DONE
 *  - if a single query, attach to component did mount ??
 *  - if single mutation, put on `mutation` function in props ??
 */

const mapIndexToProps = ({ names, index }) => {
  const derivedProps = { data: {} };
  names.forEach(
    ([dataname, typename]) =>
      (derivedProps.data[dataname] = Object.values(
        index.typenames[typename] || {}
      ))
  );
  return derivedProps;
};

const mapOperationsToProps = queries =>
  queries.reduce((acc, q) => {
    const { operation, run } = q;
    acc[operation] = run;
    return acc;
  }, {});

// Takes in an array of query objects and a component to be connected
export const gqlLink = (queries, Component) => {
  console.log(queries);
  // track names and typenames of query return data types for mapping index data to props
  const names = [];
  // iterate through list of passed in queries and use type class to generate action creator
  const queryList = queries.map(query => {
    const { operation, type, root, gql } = query;
    const { composeQuery, dataname, typename } = type;
    names.push([dataname, typename]);
    return {
      operation,
      run: params => composeQuery({ operation, root, query: gql(params) })
    };
  });

  // return connected component with appropriate index data and query actions on props
  return connect(
    index => mapIndexToProps({ names, index }),
    mapOperationsToProps(queryList)
  )(Component);
};
