import axios from "axios";
import { LYRIC_TYPE } from "./typeIndex";

class LyricType {
  constructor() {
    this.dataname = "lyrics";
    this.typename = "LyricType";
    this.typeindex = LYRIC_TYPE;

    this.composeQuery = this.composeQuery.bind(this);
  }
  composeQuery({ operation, root, query, cache }) {
    /**
     * TO DO:
     *  - validate query using schema
     *
     *  possible methods: 'query', 'mutation', *'subscription'*
     *  if method is 'query', us
     *
     */

    return dispatch =>
      axios.post("/graphql", { operation, query }).then(fulfilled => {
        dispatch({
          type: this.typeindex,
          operation,
          typename: this.typename,
          data: fulfilled.data.data[root],
          cache
        });
      });
  }
}
