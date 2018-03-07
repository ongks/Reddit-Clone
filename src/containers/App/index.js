/**
 * App is the all-encompassing container that contains both PostList
 * and SubmitPost containers.
 *
 * App instantiates the PostData class which contains information on
 * all posts. It is the single source of truth and is thus responsible
 * for maintaining and updating the instance. The PostData instance is
 * present in App's state.
 */

import React, { Component } from 'react';
import PostData from '../../helper/PostData';
import SubmitPost from '../SubmitPost';
import PostList from '../PostList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.posts = new PostData();
    this.handleSubmitTitle = this.handleSubmitTitle.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);

    this.state = {
      posts: this.posts
    };
  }

  handleSubmitTitle = (title) => {
    this.posts.insertNewPost(title);
    this.updateState();
  };

  handleUpvote = (id) => {
    this.posts.upvote(id);
    this.updateState();
  };

  handleDownvote = (id) => {
    this.posts.downvote(id);
    this.updateState();
  };

  updateState() {
    this.setState(() => ({
      posts: this.posts
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reddit Clone</h1>
        </header>

        <SubmitPost onSubmitPost={this.handleSubmitTitle}/>
        <PostList
          posts={this.state.posts}
          onUpvoteClick={this.handleUpvote}
          onDownvoteClick={this.handleDownvote}
        />
      </div>
    );
  }
}

export default App;
