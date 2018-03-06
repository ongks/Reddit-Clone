import React, { Component } from 'react';

import './App.css';
import postData from '../PostData';
import PostList from '../PostList';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Reddit Clone</h1>
          </header>

          <PostList
            posts={postData}
            onUpvoteClick={this.handleUpvote}
            onDownvoteClick={this.handleDownvote}
          />
        </div>
    );
  }
}

export default App;
