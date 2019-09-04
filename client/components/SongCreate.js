import React, { useState } from "react";
import { Link, hashHistory } from "react-router";
import { gqlLink } from "./../gql/store";
import { Song } from "../gql/schema/Song";

import { fetchSongs } from "./../gql/queries";

const SongCreate = props => {
  const [title, titleInput] = useState(() => "");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    props.addSong({ title }).then(() => hashHistory.push("/"));
    titleInput("");
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={handleSubmit}>
        <label>Song Title:</label>
        <input onChange={e => titleInput(e.target.value)} value={title} />
      </form>
    </div>
  );
};

const addSong = {
  operation: "addSong",
  type: Song,
  root: "addSong",
  gql: ({ title }) => `
    mutation addSong {
      addSong(title: "${title}") {
        id
        title
      }
    }
  `
};

export default gqlLink([addSong, fetchSongs], SongCreate);
