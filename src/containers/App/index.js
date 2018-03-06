import React, { Component } from 'react';

import './App.css';
import postData from '../PostData';
import SubmitPost from '../SubmitPost';
import PostList from '../PostList';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitTopic = this.handleSubmitTopic.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);

    this.state = {
      posts: postData
    };
  }

  handleSubmitTopic = (topic) => {
    postData.push({
        "key" : postData.length,
        "id" : postData.length,
        "title": topic,
        "upvote": 0,
        "downvote": 0
      }
    );
    this.setState(() => ({
      posts: postData
    }));
  };

  handleUpvote = (id) => {
    postData.forEach(function(post){
      if(post.id === id) post.upvote++;
    });
    this.setState(() => ({
      posts: postData
    }));
  };

  handleDownvote = (id) => {
    postData.forEach(function(post){
      if(post.id === id) post.downvote++;
    });
    this.setState(() => ({
      posts: postData
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reddit Clone</h1>
        </header>

        <SubmitPost onSubmitPost={this.handleSubmitTopic}/>
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
