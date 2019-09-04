import { Song } from "./schema/Song";

export const fetchSongs = {
  operation: "fetchSongs",
  type: Song,
  root: "songs",
  gql: () => ({
    query: `
      {
        songs {
          id
          title
        }
      }
    `,
    cache: {
      op: "replace"
    }
  })
};
