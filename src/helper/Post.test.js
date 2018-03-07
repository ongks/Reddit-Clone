import Post from './Post';

describe('Post', () => {
  it('should initialize without problems', () => {
    const post = new Post('abc', 1);
    expect(post.getId()).toBe(1);
    expect(post.getTitle()).toBe('abc');
    expect(post.getUpvotes()).toBe(0);
    expect(post.getDownvotes()).toBe(0);
    expect(post.getScore()).toBe(0);
  });

  it('should increment upvotes when upvote() is called', () => {
    const post = new Post('abc', 1);
    post.upvote();
    post.upvote();
    post.upvote();
    expect(post.getUpvotes()).toBe(3);
  });

  it('should increment score when upvote() is called', () => {
    const post = new Post('abc', 1);
    post.upvote();
    post.upvote();
    post.upvote();
    post.upvote();
    expect(post.getScore()).toBe(4);
  });

  it('should increment downvotes when downvote() is called', () => {
    const post = new Post('abc', 1);
    post.downvote();
    post.downvote();
    expect(post.getDownvotes()).toBe(2);
  });

  it('should decrement score when downvote() is called', () => {
    const post = new Post('abc', 1);
    post.downvote();
    post.downvote();
    post.downvote();
    expect(post.getScore()).toBe(-3);
  });

  it('should modify score correctly', () => {
    const post = new Post('abc', 1);
    post.upvote();
    post.upvote();
    post.downvote();
    post.downvote();
    post.downvote();
    expect(post.getScore()).toBe(-1);
  });

  it('should modify score correctly', () => {
    const post = new Post('abc', 1);
    post.upvote();
    post.upvote();
    post.upvote();
    post.downvote();
    post.downvote();
    post.downvote();
    expect(post.getScore()).toBe(0);
  });

  it('should modify score correctly', () => {
    const post = new Post('abc', 1);
    post.upvote();
    post.upvote();
    post.upvote();
    post.upvote();
    post.upvote();
    post.downvote();
    expect(post.getScore()).toBe(4);
  });
});