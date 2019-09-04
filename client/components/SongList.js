import React, { useEffect } from "react";
import { Link } from "react-router";
import { gqlLink } from "./../gql/store";

import { fetchSongs } from "./../gql/queries";

const SongList = props => {
  const { songs } = props.data;
  useEffect(() => {
    !songs.length && props.fetchSongs();
  }, []);
  if (!songs.length)
    return (
      <ul className="collection">
        <li className="collection-item">Loading...</li>
      </ul>
    );

  // const handleDeleteSong = id =>
  //   props
  //     .mutate({
  //       variables: { id }
  //     })
  //     .then(() => refetch());

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

export default gqlLink([fetchSongs], SongList);
