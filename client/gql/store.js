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
 *  - create custom selector that puts together queried data for a given component ??
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
  // track names and typenames of query return data types for mapping index data to props
  const names = [];
  // iterate through list of passed in queries and use type class to generate action creator
  const queryList = queries.map(q => {
    const { operation, type, root, gql } = q;
    const { composeQuery, dataname, typename } = type;
    names.push([dataname, typename]);
    return {
      operation,
      run: params => {
        const { query, cache } = gql(params);
        return composeQuery({ operation, root, query, cache });
      }
    };
  });

  // return connected component with appropriate index data and query actions on props
  return connect(
    index => mapIndexToProps({ names, index }),
    mapOperationsToProps(queryList)
  )(Component);
};
