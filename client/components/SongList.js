import React, { useEffect } from "react";
import { Link } from "react-router";
import { graphql } from "react-apollo";

import fetchSongs from "./../queries/fetchSongs";
import deleteSong from "./../mutations/deleteSong";

const SongList = props => {
  const { loading, songs, refetch } = props.data;
  if (loading)
    return (
      <ul className="collection">
        <li className="collection-item">Loading...</li>
      </ul>
    );

  const handleDeleteSong = id =>
    props
      .mutate({
        variables: { id }
      })
      .then(() => refetch());

  const renderSongs = () =>
    songs.map(song => (
      <li key={`st${song.id}`} className="collection-item">
        <Link to={`/songs/${song.id}`}>{song.title}</Link>
        <i className="material-icons" onClick={() => handleDeleteSong(song.id)}>
          delete
        </i>
      </li>
    ));

  return (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
