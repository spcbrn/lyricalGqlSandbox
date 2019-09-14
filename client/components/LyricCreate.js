import React, { useState } from "react";
import { gqlLink } from "./../gql/store";
import { Song } from './../gql/schema/song';
// import { graphql } from "react-apollo";

// import addSongLyric from "../mutations/addSongLyric";
// import fetchSong from "./../queries/fetchSong";

const LyricCreate = ({ songId, addLyricToSong }) => {
  const [lyric, lyricInput] = useState(() => "");

  const handleSubmit = e => {
    e.preventDefault();
    if (!lyric) return;
    console.log(lyric);
    addLyricToSong({
      songId,
      content: lyric
    });
    lyricInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a Lyric:</label>
      <input onChange={e => lyricInput(e.target.value)} value={lyric} />
    </form>
  );
};

const addLyricToSong = {
  operation: 'addLyricToSong',
  type: Song,
  root: 'addLyricToSong',
  gql: ({ songId, content }) => ({
    query: `
      mutation addLyricToSong {
        addLyricToSong(
          songId: "${songId}",
          content: "${content}"
        ) {
          id
          lyrics {
            id
            likes
            content
          }
        }
      }
    `,
    cache: {
      op: 'merge',
      id: songId
    }
  })
};

export default gqlLink([addLyricToSong], LyricCreate);
