import React, { Component } from 'react';

import './App.css';
import PostData from '../../helper/PostData';
import SubmitPost from '../SubmitPost';
import PostList from '../PostList';

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

  handleSubmitTitle = (topic) => {
    this.posts.insertNewPost(topic);
    this.setState(() => ({
      posts: this.posts
    }));
  };

  handleUpvote = (id) => {
    this.posts.upvote(id);
    this.setState(() => ({
      posts: this.posts
    }));
  };

  handleDownvote = (id) => {
    this.posts.downvote(id);
    this.setState(() => ({
      posts: this.posts
    }));
  };

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
