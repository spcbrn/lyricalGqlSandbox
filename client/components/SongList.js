import React, { useEffect } from "react";
import { Link } from "react-router";
import { gqlLink } from "./../gql/store";
import { Song } from "./../gql/schema/Song";

import { fetchSongs } from "./../gql/queries";

const SongList = props => {
  const { songs } = props.data;
  useEffect(() => {
    props.fetchSongs();
  }, []);
  if (!songs.length)
    return (
      <ul className="collection">
        <li className="collection-item">Loading...</li>
      </ul>
    );

  const handleDeleteSong = id => (false ? props.deleteSong({ id }) : null);

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

const deleteSong = {
  operation: "deleteSong",
  type: Song,
  root: "deleteSong",
  gql: ({ id }) => ({
    query: `
      mutation deleteSong {
        deleteSong(id: "${id}") {
          id
        }
      }
    `,
    cache: {
      op: "delete",
      key: id
    }
  })
};

const fetchSongList = {
  operation: "fetchSongs",
  type: Song,
  root: "songs",
  gql: () => ({
    query: `
      {
        songs {
          id
          title
        }
      }
    `,
    cache: {
      op: "replace"
    }
  })
};

export default gqlLink([fetchSongList], SongList);
