import React, { useState } from "react";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";

import addSong from "./../mutations/addSong";
import fetchSongs from "./../queries/fetchSongs";

const SongCreate = props => {
  const [title, titleInput] = useState(() => "");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    props
      .mutate({
        variables: { title },
        refetchQueries: [{ query: fetchSongs }]
      })
      .then(() => hashHistory.push("/"));
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

export default graphql(addSong)(SongCreate);
