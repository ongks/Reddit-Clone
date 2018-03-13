/**
 * PostList handles the rendering of the list of posts passed down
 * from App. It also handles the upvote & downvote button function.
 */

import React, { Component } from 'react';
import PostView from '../../components/PostView';

class PostList extends Component {
  render() {
    const { posts, onUpvoteClick, onDownvoteClick } = this.props;
    return (
      <div className="PostList">
        { posts.displayList().map((post) => (
          <PostView
            key={post.id}
            id={post.id}
            title={post.title}
            score={post.getUpvotes() - post.getDownvotes()}
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