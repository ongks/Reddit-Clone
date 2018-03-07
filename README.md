# Reddit Clone

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), including the ./public folder. All other files in ./src are self-written.

A sample deployment of the application can be found [here](https://reddit-clone-ongks.herokuapp.com/).

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Choice of stack](#choice-of-stack)
- [Data Structure](#data-structure)
- [Assumptions](#assumptions)

## Features
1. Submit Posts
* User can submit posts, up to a limit of 255 characters.

2. Upvoting/Downvoting a post
* User can upvote/downvote a post using the buttons to the left of each post.

3. View a list of posts
* By default, users can view up to 20 posts, ranked by their score. The score assigned to each post is the net difference between the upvotes & downvotes of each post.

## Installation

Install dependencies:
```
npm install
```

Start the server:
```
npm start
```

Tests can be run via:
```
npm test
```

The local server can be found on http://localhost:3000/

## Choice of stack
React.js UI library was chosen as the front end framework. This is because React emphasizes on re-rendering only the components that have changed over time. Thus, for an application that is dynamic and changes constantly with user input, I chose to work with React.

No back end server was implemented. All requests are directly handled on client side. This is based on the assumption that no data persistence is required, and that data can disappear upon application restart.

The test cases are written based on the Jest testing framework.

## Data structure

The in-memory data structure used to store all information provided by user is implemented in the `PostData` class. It consists of a data array and a hashMap object.

The underlying data structure of the data array is a dynamic array that increases in size as more posts are added. However, what makes this array unique is its 2 part structure.

The first 20 indices of the array contains posts with the top 20 scores (upvote - downvote), sorted in descending order. The remaining indices in the array contain all other posts, stored as a max heap. The 21st index is the root of the heap.

Accompanying the array is a Javascript object that serves as a hashMap. The hashMap maps the unique id of each post to its current position in the data array.

The time complexities associated with the above data structures are:
 - Insert, upvote, downvote: O(log n)
 - Display top 20 posts: O(1)

We can keep the top 20 array sorted with low cost. Insert/upvote/downvote operations are done by bubbling (swapping) elements up and down in a linear fashion. These operations will only take O(1) due to the constant size of the array.

On the other hand, when the posts are below the top 20, the bubbling up/down of the posts are done based on a max-heap implementation, resulting in the O(log n) time complexities.

The reasoning behind such a data structure is inspired by the original Reddit usage pattern. There are many posts that are submitted, yet only a small proportion gets upvoted highly and obtain a large score. Majority of the posts have low scores. Thus, a heap data structure would allow quick updating of posts with low scores.

## Assumptions
The requirements `Design an in-memory data structure (shared by the same process as your application)` as well as `It is okay for the topics to disappear after the application restarts` imply that the data can be stored on client side, without the need for a back end server to handle the POST requests.