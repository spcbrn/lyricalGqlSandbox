import axios from "axios";
import * as _ from "lodash";

const initialIndex = {
  typenames: {}
};

export const fetchSongss = () => ({
  type: QUERY__FETCH_SONGS,
  typename: "SongType",
  data: axios
    .post("/graphql", {
      operation: "FetchSongs",
      query: fetchSongsQuery
    })
    .then(fulfilled => fulfilled.data)
});

const SONG_TYPE = "SONG_TYPE";

class SongType {
  constructor() {
    this.name = "songs";
    this.typename = SONG_TYPE;
  }
  createQuery({ operation, query }) {
    /**
     * TO DO:
     *  - validate query using schema
     */
    return dispatch =>
      axios.post("/graphql", { operation, query }).then(fulfilled => {
        const { songs } = fulfilled.data.data;
        dispatch({
          type: SONG_TYPE,
          typename: this.typename,
          songs
        });
      });
  }
}

export const Song = new SongType();

// perhaps farm all out to type class
// const fetchSongs = {
//   type: Song,
//   query: () =>
//     Song.createQuery({
//       operation: "FetchSongs",
//       query: `
//       query fetchSongs {
//         songs {
//           id
//           title
//         }
//       }
//     `
//     })
// };

const reducer = (index = initialIndex, action) => {
  switch (action.type) {
    case SONG_TYPE: {
      const { typename, songs } = action;
      const { typenames } = index;
      const nextIndex = Object.assign({}, typenames);
      if (!nextIndex[typename]) nextIndex[typename] = {};
      const typeIndex = nextIndex[typename];
      songs.forEach(song => {
        typeIndex[song.id] = Object.assign(typeIndex[song.id] || {}, song);
      });
      return {
        typenames: nextIndex
      };
    }
    default:
      return index;
  }
};

export default reducer;
