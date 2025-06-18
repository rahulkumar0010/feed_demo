const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory data
let posts = [];
let comments = {};
let postId = 1;

// Get all posts
app.get('/posts', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page)||1;

  let startIndex = (page-1||0)*limit;

 

  const paginatedPosts = posts.slice(startIndex, startIndex + limit);
  const nextCursor =
    startIndex + limit < posts.length ? posts[startIndex + limit - 1].id : null;

  res.json({
    posts: paginatedPosts,
    nextPage: nextCursor,
  });
});

// Create a post
app.post('/posts', (req, res) => {
  const { content } = req.body;
  const newPost = { id: postId++, content, likes: 0 };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

// Like a post
app.post('/posts/:id/like', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes += 1;
    res.json({ success: true, likes: post.likes });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  const id = req.params.id;
  res.json(comments[id] || []);
});

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  const id = req.params.id;
  const { text } = req.body;

  if (!comments[id]) comments[id] = [];
  const newComment = { id: Date.now(), text };
  comments[id].push(newComment);

  res.status(201).json(newComment);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
