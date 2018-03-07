/**
 * SubmitPost container renders the submission form, and handles user input
 * as well as the submit button function.
 */

import React, { Component } from 'react';
import './index.css';

class SubmitPost extends Component {
  MAX_TITLE_LENGTH = 255;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const titleInput = e.target.value;
    if (titleInput.length <= this.MAX_TITLE_LENGTH) {
      this.setState({
        title: titleInput
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmitPost(this.state.title);
    this.setState({
      title: ''
    });
  };

  render() {
    let charsLeft = this.MAX_TITLE_LENGTH - this.state.title.length;
    return (
      <div className="SubmitPost">
        <div className="titleInput">
          <input
            type="text"
            placeholder="Write the title of your post."
            onChange={ this.handleChange }
            value={ this.state.title }
            required
          />
          <div className="charsLeft">
            {charsLeft} / {this.MAX_TITLE_LENGTH} characters left.
          </div>
        </div>

        <div>
          <button className="buttonPanel"
            type="submit"
            onClick={ this.handleSubmit }>
            Submit
          </button>
        </div>

      </div>
    );
  }
}

export default SubmitPost;