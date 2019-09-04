import axios from "axios";
import * as _ from "lodash";

import { SONG_TYPE } from "./schema/typeIndex";

const initialIndex = {
  typenames: {
    SongType: {}
  }
};

const reducer = (index = initialIndex, action) => {
  switch (action.type) {
    case SONG_TYPE: {
      const { typename, data } = action;
      const { typenames } = index;
      const nextIndex = Object.assign({}, typenames);
      if (!nextIndex[typename]) nextIndex[typename] = {};
      const typeIndex = nextIndex[typename];
      const songs = data instanceof Array ? data : [data];
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
