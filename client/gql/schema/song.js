import axios from "axios";

import { SONG_TYPE } from "./typeIndex";

class SongType {
  constructor() {
    this.dataname = "songs";
    this.typename = "SongType";
    this.typeindex = SONG_TYPE;

    this.composeQuery = this.composeQuery.bind(this);
  }
  composeQuery({ operation, root, query }) {
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
        console.log(fulfilled);
        dispatch({
          type: this.typeindex,
          typename: this.typename,
          data: fulfilled.data.data[root]
        });
      });
  }
}

export const Song = new SongType();
