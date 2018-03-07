import React, { Component } from 'react';
import Post from '../../components/Post';

class PostList extends Component {
  render() {
    const { posts, onUpvoteClick, onDownvoteClick } = this.props;
    return (
      <div className="PostList">
        { posts.displayList().map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            upvote={post.getUpvotes()}
            downvote={post.getDownvotes()}
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