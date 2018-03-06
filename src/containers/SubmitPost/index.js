import React, { Component } from 'react';

class SubmitPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const topicInput = e.target.value;
    if (topicInput.length <= 255) {
      this.setState({
        title: topicInput
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
    return (
      <div className="SubmitPost">
        <input
          type="text"
          placeholder="Write the title of your post. Maximum character limit is 255."
          onChange={ this.handleChange }
          value={ this.state.title }
          required
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SubmitPost;