import React from 'react';

const Post = ({
  id,
  title,
  upvote,
  downvote,
  onUpvoteClick,
  onDownvoteClick
}) => {
  return (
    <div className="post" data-id={id}>
      <div className="post-title">{title}</div>
      <div className="post-votes">
        <div className="post-upvoteButton" onClick={onUpvoteClick} />
        <div className="post-upvote">{upvote} Upvote </div>
        <div className="post-downvoteButton" onClick={onDownvoteClick} />
        <div className="post-upvote">{downvote} Downvote </div>
      </div>
    </div>
  );

};

export default Post;