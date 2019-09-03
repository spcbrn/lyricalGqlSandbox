import React, { Component, useEffect } from "react";
import { Link } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const SongList = props => {
  const renderSongs = () =>
    props.data.loading ? (
      <li className="collection-item">Loading...</li>
    ) : (
      props.data.songs.map(song => (
        <li key={`st${song.id}`} className="collection-item">
          {song.title}
        </li>
      ))
    );
  return (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
