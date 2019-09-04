import { Song } from "./schema/Song";

export const fetchSongs = {
  operation: "fetchSongs",
  type: Song,
  root: "songs",
  gql: () => `
    {
      songs {
        id
        title
      }
    }
  `
};
