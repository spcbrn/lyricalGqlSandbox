import React from "react";
import { graphql } from "react-apollo";

import likeLyric from "./../mutations/likeLyric";

const LyricList = ({ lyrics, mutate }) => {
  if (!lyrics.length) return null;
  const handleLike = (id, likes) => {
    mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          __typename: "LyricType",
          id,
          likes
        }
      }
    });
  };
  const renderLyrics = () =>
    lyrics.map(({ id, content, likes }) => (
      <li key={`sl${id}`} className="collection-item">
        {content}
        <span className="vote-box">
          {likes}&nbsp;&nbsp;
          <i
            className="material-icons"
            onClick={() => handleLike(id, likes + 1)}
          >
            thumb_up
          </i>
        </span>
      </li>
    ));
  return <ul className="collection">{renderLyrics()}</ul>;
};

export default graphql(likeLyric)(LyricList);
