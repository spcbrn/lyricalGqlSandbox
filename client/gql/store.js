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
 *  - use typename on queries to map appropriate state as data
 *  - register the queries in a matp object as they are redux actions under the hood
 *  - if a single query, attach to component did mount ??
 *  - if single mutation, put on `mutation` function in props ??
 */

const mapIndexToProps = ({ names, index }) => {
  const derivedProps = { data: {} };
  names.forEach(
    ([name, typename]) =>
      (derivedProps.data[name] = Object.values(index.typenames[typename] || {}))
  );
  return derivedProps;
};

const mapOperationsToProps = queries =>
  queries.reduce((acc, q) => {
    const { operation, run } = q;
    acc[operation] = run;
    return acc;
  }, {});

export const gqlLink = (queries, Component) => {
  const queryList = queries.map(q => q());
  const names = queryList.map(({ type }) => [type.name, type.typename]);

  return connect(
    index => mapIndexToProps({ names, index }),
    mapOperationsToProps(queryList)
  )(Component);
};
