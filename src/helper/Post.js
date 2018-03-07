class Post {
  constructor(title, id) {
    this.id = id;
    this.title = title;
    this.upvotes = 0;
    this.downvotes = 0;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getUpvotes() {
    return this.upvotes;
  }

  getDownvotes() {
    return this.downvotes;
  }

  getScore() {
    return this.upvotes - this.downvotes;
  }

  upvote() {
    this.upvotes++;
  }

  downvote() {
    this.downvotes++;
  }
}

export default Post;