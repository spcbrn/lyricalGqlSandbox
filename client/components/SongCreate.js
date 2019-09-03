import React, { useState } from "react";
import { Link, hashHistory } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const SongCreate = props => {
  const [title, titleInput] = useState(() => "");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    props
      .mutate({
        variables: {
          title
        }
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

const submitForm = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(submitForm)(SongCreate);
