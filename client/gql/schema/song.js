import axios from "axios";
import { SONG_TYPE } from "./typeIndex";

axios.interceptors.request.use(req => {
  if (req.url === "/graphql")
    req.data.query = req.data.query.replace(/(id\n)/g, `__typename\n id\n`);
  return req;
});

class SongType {
  constructor() {
    this.dataname = "songs";
    this.typename = "SongType";
    this.typeindex = SONG_TYPE;

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
    const regexp = /(id\n)/g;
    const formatted = query.replace(regexp, `__typename\n id\n`);

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

export const Song = new SongType();
