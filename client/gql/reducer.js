import axios from "axios";
import * as _ from "lodash";

import { SONG_TYPE } from "./schema/dataTypes";

const initialIndex = {
  typenames: {
    SongType: {}
  }
};

/**
 * fetch songs - replace entire SongType index
 * add song - add new song to SongType index
 * delete song - remove entry from SongType index
 */

const updateIndex = ({ cache, data, index }) => {
  let newIndex;
  switch (cache.op) {
    case "replace": {
      newIndex = {};
      data.forEach(
        item => (newIndex[item.id] = Object.assign(index[item.id] || {}, item))
      );
      break;
    }
    case "merge":
      return index;
    case "insert":
    case "update": {
      newIndex = Object.assign({}, index);
      if (data instanceof Array)
        data.forEach(item => (newIndex[item.id] = item));
      else newIndex[data.id] = data;
      break;
    }
    case "delete": {
      newIndex = Object.assign({}, index);
      delete newIndex[cache.key];
      break;
    }
    default:
      return index;
  }
  return newIndex;
};

/**
 *
 * When data arrives, run algorithm the traverses and finds '__typename',
 * using that value and the associated record id to update the index
 * with new data
 */

const reducer = (index = initialIndex, action) => {
  switch (action.type) {
    case SONG_TYPE: {
      const { typename, data, cache } = action;
      const { typenames } = index;
      const nextTypenameIndex = Object.assign({}, typenames);
      if (!nextTypenameIndex[typename]) nextTypenameIndex[typename] = {};
      nextTypenameIndex[typename] = updateIndex({
        cache,
        data,
        index: nextTypenameIndex[typename]
      });

      return {
        typenames: nextTypeIndex
      };
    }
    default:
      return index;
  }
};

export default reducer;
