/**
 *  PostData is the class that encapsulates all data & attributes
 *  concerning the storage, retrieval & update of information
 *  on the posts.
 *
 *  There are 2 important data structures in the PostData instance:
 *  1. The data array stores a post in each index. The first 20 posts
 *  are always sorted in descending order of score (upvote - downvote).
 *  The remaining indices form a max heap, with the root in index 20
 *  (21st entry).
 *
 *  2. The hashMap object serves as the lookup point for each post.
 *  It maps the unique id to its current position in the data array.
 * */

import Post from './Post';
import MinHeap from './MinHeap';

class PostData {
  DISPLAY_SIZE = 20;

  constructor() {
    this.minHeap = new MinHeap();
    this.data = [];
    this.hashMap = {};
  }

  insertNewPost(title){
    const newId = this.data.length;
    this.data.push(new Post(title, newId));
    this.hashMap[newId] = newId;
    this.bubbleUp(newId);
  }

  upvote(id) {
    const position = this.hashMap[id];
    this.data[position].upvote();
    this.bubbleUp(position);
  }

  downvote(id) {
    const position = this.hashMap[id];
    this.data[position].downvote();
    this.bubbleDown(position);
  }

  displayList() {
    return this.data.slice(0, this.DISPLAY_SIZE);
  }

  /**
   * Based on the location of Post (in Top 20 array or heap),
   * perform linear or heap bubbleUp accordingly.
   * If Post is the root (max) of the heap, then compare with last entry
   * in the top 20 array and bubble up if required.
   * @param position for new or upvoted Post
   */
  bubbleUp(position) {
    if (position <= this.DISPLAY_SIZE) {
      while(this.data[position].getScore() > this.data[position-1].getScore()){
        this.swap(position, position - 1);
        position--;
      }
    } else {
      while (position > this.DISPLAY_SIZE) {
        const parentIndex = Math.floor((position - this.DISPLAY_SIZE + 1) / 2)
          - 1 + this.DISPLAY_SIZE;

        if(this.data[parentIndex].getScore() < this.data[position].getScore()){
          this.swap(parentIndex, position);

          // if bubbled all the way to top, compare with top 20 now.
          if (parentIndex === this.DISPLAY_SIZE) {
            this.bubbleUp(parentIndex);
          }
        }
        position = parentIndex;
      }
    }
  }

  /**
   * Based on the location of Post (in Top 20 array or heap),
   * perform linear or heap bubbleDown accordingly.
   * If Post is the last entry in the top 20 array, compare with root of heap
   * and bubble down if required.
   * @param position for downvoted Post
   */
  bubbleDown(position) {
    if (position < this.DISPLAY_SIZE) {
      while (position < this.DISPLAY_SIZE &&
        this.data[position].getScore() < this.data[position+1].getScore()) {
        this.swap(position, position + 1);
        position++;

        if (position === this.DISPLAY_SIZE) this.bubbleDown(position);
      }
    } else {
      let leftIndex = (position - this.DISPLAY_SIZE) * 2 +
        1 + this.DISPLAY_SIZE;

      // while loop iterates through until current position is a leaf
      while (leftIndex < this.data.length) {
        leftIndex = (position - this.DISPLAY_SIZE) * 2 + 1 + this.DISPLAY_SIZE;
        const leftScore = this.data[leftIndex].getScore();

        // if loop continues, left child must exist, so just need verify if right
        // child exists. If it doesn't, set rightScore to lowest possible value
        // by default.
        const rightIndex = leftIndex + 1;
        let rightScore = Math.MIN_VALUE;
        if (rightIndex < this.data.length) {
          rightScore = this.data[rightIndex].getScore();
        }

        const maxValue = Math.max(leftScore, rightScore,
          this.data[position].getScore());
        if(leftScore === maxValue) {
          this.swap(position, leftIndex);
          position = leftIndex;
        } else if (rightScore === maxValue) {
          this.swap(position, rightIndex);
          position = rightIndex;
        } else {
          return ;
        }
      }
    }
  }

  swap(position1, position2) {
    // Swap position value in hashMap
    const Post1 = this.data[position1];
    const Post2 = this.data[position2];
    this.hashMap[Post2.getId()] = position1;
    this.hashMap[Post1.getId()] = position2;

    // Swap posts in data array
    // let temp = currentPost;
    this.data[position1] = Post2;
    this.data[position2] = Post1;
  }
}

export default PostData;