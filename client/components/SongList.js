import React, { useEffect } from "react";
import { Link } from "react-router";
import { gqlLink } from "./../gql/store";
import { Song } from "./../gql/reducer";
// import { graphql } from "react-apollo";

// import fetchSongs from "./../queries/fetchSongs";
// import deleteSong from "./../mutations/deleteSong";

const SongList = props => {
  console.log(props);
  useEffect(() => {
    props.fetchSongs();
  }, []);
  const { songs } = props.data;
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

const fetchSongs = () => {
  const operation = "fetchSongs";
  return {
    type: Song,
    operation,
    run: () =>
      Song.createQuery({
        operation,
        query: `
        query fetchSongs {
          songs {
            id
            title
          }
        }
      `
      })
  };
};

export default gqlLink([fetchSongs], SongList);
// export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
