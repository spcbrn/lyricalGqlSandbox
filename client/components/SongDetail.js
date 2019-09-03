import React from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";

import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

import fetchSong from "./../queries/fetchSong";
const options = {
  options: props => ({ variables: { id: props.params.id } })
};

const SongDetail = props => {
  const { loading, song } = props.data;
  if (loading) return null;

  return (
    <div>
      <Link to="/">back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={song.id} />
    </div>
  );
};

export default graphql(fetchSong, options)(SongDetail);
