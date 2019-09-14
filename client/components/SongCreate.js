import React, { useState } from "react";
import { Link, hashHistory } from "react-router";
import { gqlLink } from "./../gql/store";
import { Song } from "../gql/schema/Song";

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
        <input
          autoFocus
          onChange={e => titleInput(e.target.value)}
          value={title}
        />
      </form>
    </div>
  );
};

const addSong = {
  operation: "addSong",
  type: Song,
  root: "addSong",
  gql: ({ title }) => ({
    query: `
      mutation addSong {
        addSong(title: "${title}") {
          id
          title
        }
      }
    `,
    cache: {
      op: "insert"
    }
  })
};

export default gqlLink([addSong], SongCreate);
