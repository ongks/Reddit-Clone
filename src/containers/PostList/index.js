import React, { Component } from 'react';
import Post from '../../components/Post';

class PostList extends Component {
  render() {
    const { posts, onUpvoteClick, onDownvoteClick } = this.props;
    return (
      <div className="PostList">
        { posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            upvote={post.upvote}
            downvote={post.downvote}
            onUpvoteClick={function() {
              onUpvoteClick(post.id);
            }}
            onDownvoteClick={function() {
              onDownvoteClick(post.id);
            }}
          />
        ))}
      </div>
    );
  }
}

export default PostList;