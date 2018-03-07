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

class PostData {
  DISPLAY_SIZE = 20;

  constructor() {
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
    // If post's score is in top 20
    if (position <= this.DISPLAY_SIZE) {
      while(position > 0 && this.data[position].getScore() > this.data[position-1].getScore()){
        this.swap(position, position - 1);
        position--;
      }
    } else {     // Post's rank is below 20 and is in the heap
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
    // If post's score is in the top 20
    if (position < this.DISPLAY_SIZE) {
      while (position < this.DISPLAY_SIZE && position + 1 < this.data.length &&
      this.data[position].getScore() < this.data[position+1].getScore()) {
        this.swap(position, position + 1);
        position++;

        // When bubble down reaches the end of the top 20 array, need to compare
        // with the root of heap to see if it should go down further.
        if (position === this.DISPLAY_SIZE) this.bubbleDown(position);
      }
    } else {    // Post below 20th rank, and will now do heap bubbleDown
      let leftIndex = (position - this.DISPLAY_SIZE) * 2 +
        1 + this.DISPLAY_SIZE;

      // while loop iterates until current position is a leaf in the heap
      while (leftIndex < this.data.length) {
        const leftScore = this.data[leftIndex].getScore();

        // if loop continues, left child must exist, so just need verify if right
        // child exists. If it doesn't, set rightScore to lowest possible value
        // by default.
        const rightIndex = leftIndex + 1;
        let rightScore = Number.MIN_SAFE_INTEGER ;
        if (rightIndex < this.data.length) {
          rightScore = this.data[rightIndex].getScore();
        }

        const maxValue = Math.max(leftScore, rightScore,
          this.data[position].getScore());

        if(leftScore === maxValue) {
          this.swap(position, leftIndex);
          position = leftIndex;
          leftIndex = (position - this.DISPLAY_SIZE) * 2 + 1 + this.DISPLAY_SIZE;

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
    const Post1 = this.data[position1];
    const Post2 = this.data[position2];

    // Swap position value in hashMap
    this.hashMap[Post2.getId()] = position1;
    this.hashMap[Post1.getId()] = position2;

    // Swap posts in data array
    this.data[position1] = Post2;
    this.data[position2] = Post1;
  }
}

export default PostData;