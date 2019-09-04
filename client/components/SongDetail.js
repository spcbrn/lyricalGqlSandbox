import React, { useEffect } from "react";
import { Link } from "react-router";
import { gqlLink } from "./../gql/store";
import { Song } from "./../gql/schema/Song";

import LyricList from "./LyricList";
import LyricCreate from "./LyricCreate";

const SongDetail = props => {
  useEffect(() => {
    props.fetchSong({ id: props.routeParams.id });
  }, []);

  if (!props.data.songs.length) return null;
  const song = props.data.songs.find(c => c.id === props.routeParams.id);
  if (!song.lyrics) return null;

  return (
    <div>
      <Link to="/">back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={song.id} />
    </div>
  );
};

export const fetchSong = {
  operation: "fetchSong",
  type: Song,
  root: "song",
  gql: ({ id }) => ({
    query: `
      query fetchSong {
        song(id: "${id}") {
          id
          title
          lyrics {
            id
            likes
            content
          }
        }
      }
    `,
    cache: {
      op: "update",
      id
    }
  })
};

export default gqlLink([fetchSong], SongDetail);
// export default graphql(fetchSong, options)(SongDetail);
