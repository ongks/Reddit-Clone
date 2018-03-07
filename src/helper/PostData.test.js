import Post from './Post';
import PostData from './PostData';

describe('PostData intialization', () => {
  const postData = new PostData();

  it('should initialize without problems', () => {
    expect(postData.data).toEqual([]);
    expect(postData.hashMap).toEqual({});
  });
});

/**
 * Tests for insert operation:
 * 1. Insert when empty
 * 2a. Insert when few elements present, all >= 0 score
 * 2b. Insert when few elements present, all < 0 score
 * 3. Insert when >20 present, some positive, some negative, some 0 score.
 */
describe('PostData insertion', () => {
  const postData = new PostData();

  it('should store post correctly when postData is empty', () => {
    postData.insertNewPost('post0');
    expect(postData.data[0].getTitle()).toEqual('post0');
    expect(postData.hashMap[0]).toEqual(0);
  });

  it('should store post correctly when postData has 10 items, all non-negative score', () => {
    for(let i = 1; i < 10; i++) {
      postData.insertNewPost('post' + i);
      postData.upvote(i);
    }
    postData.insertNewPost('post10');
    expect(postData.data[10].getTitle()).toEqual('post10');
    expect(postData.hashMap[10]).toEqual(10);
  });

  it('should store post correctly when postData has 10 items, all negative score', () => {
    postData.downvote(0);
    for(let i = 1; i < 10; i++) {
      postData.insertNewPost('post' + i);
      postData.downvote(i);
      postData.downvote(i);
    }
    postData.insertNewPost('post10');
    expect(postData.data[0].getTitle()).toEqual('post10');
    expect(postData.hashMap[10]).toEqual(0);
  });

  it('should store post correctly when postData has 22 items', () => {
    const postData = new PostData();

    for(let i = 0; i < 11; i++) {
      postData.insertNewPost('post' + 2 * i);
      postData.insertNewPost('post' + 2 * i + 1);
      postData.upvote(2 * i);
      postData.downvote(2 * i + 1);
    }

    postData.insertNewPost('post23');
    postData.insertNewPost('post24');
    postData.insertNewPost('post25');

    expect(postData.data[11].getTitle()).toEqual('post23');
    expect(postData.hashMap[22]).toEqual(11);

    expect(postData.data[13].getTitle()).toEqual('post25');
    expect(postData.hashMap[24]).toEqual(13);
  });
});

/**
 * Tests for upvote operation:
 * 1. Post is in top 20 array:
 *    1a. Post is in index 0
 *    1b. Post is in index 10
 *    1c. Post is in index 19
 * 2. Post is in heap:
 *    2a. Post is in index 20
 *    2b. Post is in index 30
 */
describe('PostData upvote', () => {
  const postData = new PostData();
  for(let i = 0; i < 30; i++) {
    postData.insertNewPost('post' + i);
    postData.upvote(i);
  }
  for(let i = 29; i > 14; i--) {
    postData.downvote(i);
    postData.downvote(i);
  }

  it('should upvote post at index 0 correctly', () => {
    postData.upvote(0);
    expect(postData.data[0].getTitle()).toEqual('post0');
    expect(postData.hashMap[0]).toEqual(0);
  });

  it('should upvote post at index 10 correctly', () => {
    postData.upvote(10);
    expect(postData.data[1].getTitle()).toEqual('post10');
    expect(postData.hashMap[10]).toEqual(1);
  });

  it('should upvote post at index 19 correctly', () => {
    postData.upvote(19);
    expect(postData.data[15].getTitle()).toEqual('post19');
    expect(postData.hashMap[19]).toEqual(15);
  });

  it('should upvote post at index 20 correctly', () => {
    postData.upvote(20);
    expect(postData.data[16].getTitle()).toEqual('post20');
    expect(postData.hashMap[20]).toEqual(16);
  });

  it('should upvote post at index 29 correctly', () => {
    postData.upvote(29);
    expect(postData.data[17].getTitle()).toEqual('post29');
    expect(postData.hashMap[29]).toEqual(17);
  });
});

/**
 * Tests for downvote operation:
 * 1. Post is in top 20 array:
 *    1a. Post is in index 0
 *    1b. Post is in index 10
 *    1c. Post is in index 19
 * 2. Post is in heap:
 *    2a. Post is in index 20
 *    2b. Post is in index 27
 */
describe('PostData downvote', () => {
  const postData = new PostData();
  for(let i = 0; i < 30; i++) {
    postData.insertNewPost('post' + i);
    postData.upvote(i);
  }
  for(let i = 29; i > 14; i--) {
    postData.downvote(i);
    postData.downvote(i);
  }

  it('should downvote post at index 0 correctly', () => {
    postData.downvote(0);
    expect(postData.data[0].getTitle()).toEqual('post1');
    expect(postData.hashMap[1]).toEqual(0);
    expect(postData.data[14].getTitle()).toEqual('post0');
    expect(postData.hashMap[0]).toEqual(14);
  });

  it('should downvote post at index 10 correctly', () => {
    postData.downvote(10);
    expect(postData.data[13].getTitle()).toEqual('post10');
    expect(postData.hashMap[10]).toEqual(13);
  });

  it('should downvote post at index 19 correctly', () => {
    const postId = postData.data[19].getId();
    postData.downvote(postId);
    expect(postData.hashMap[postId]).toBeGreaterThan(20);
  });

  it('should downvote post at index 20 correctly', () => {
    const postId = postData.data[20].getId();
    postData.downvote(postId);
    expect(postData.hashMap[postId]).toBeGreaterThan(20);
  });

  it('should downvote post at index 29 correctly', () => {
    postData.downvote(29);
    expect(postData.hashMap[29]).toBeGreaterThan(20);
  });
});

/**
 * Tests for displayList operation:
 * Arrays of length 0, 3, 20, 25 should display an array of length <= 20.
 */
describe('PostData displayList', () => {
  const postData = new PostData();
  it('should correctly display an empty list', () => {
    const list = postData.displayList();
    expect(list.length).toBe(0);
  });

  it('should correctly display a list with 3 elements', () => {
    for(let i = 0; i < 3; i++) {
      postData.insertNewPost('post' + i);
    }
    const list = postData.displayList();
    expect(list.length).toBe(3);
  });

  it('should correctly display a list with 20 elements', () => {
    for(let i = 0; i < 17; i++) {
      postData.insertNewPost('post' + i);
    }
    const list = postData.displayList();
    expect(list.length).toBe(20);
  });

  it('should correctly display a list of 20 even though array has 25 elements', () => {
    for(let i = 0; i < 5; i++) {
      postData.insertNewPost('post' + i);
    }
    const list = postData.displayList();
    expect(list.length).toBe(20);
  });
});