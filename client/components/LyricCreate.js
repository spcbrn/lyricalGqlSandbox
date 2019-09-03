import React, { useState } from "react";
import { graphql } from "react-apollo";

import addSongLyric from "../mutations/addSongLyric";
import fetchSong from "./../queries/fetchSong";

const LyricCreate = props => {
  const [lyric, lyricInput] = useState(() => "");

  const handleSubmit = e => {
    e.preventDefault();
    if (!lyric) return;
    props.mutate({
      variables: {
        content: lyric,
        songId: props.songId
      }
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

export default graphql(addSongLyric)(LyricCreate);
