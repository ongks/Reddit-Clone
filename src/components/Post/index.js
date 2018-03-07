/**
 * The Post component is the presentational component for each post. It
 * informs PostList how to render each post.
 */

import React from 'react';
import "./index.css";

const Post = ({
  title,
  score,
  upvote,
  downvote,
  onUpvoteClick,
  onDownvoteClick
}) => {
  return (
    <div className="post">
      <div className="leftPanel">
        <div className="upvoteButton" onClick={onUpvoteClick} />
        <div className="score">{score}</div>
        <div className="downvoteButton" onClick={onDownvoteClick} />
      </div>
      <div className="rightPanel">
        <div className="title">{title}</div>
        <div className="votes">{upvote} upvotes, {downvote} downvotes </div>
      </div>
    </div>
  );

};

export default Post;