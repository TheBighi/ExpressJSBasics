const express = require('express');
const posts = require('./data')
const app = express();

app.use(express.json());

const { getPosts, getPostByID, postPost,putPost, patchPost, deletePost } = require('./controllers/posts')

app.get('/posts', (req, res) => getPosts(req, res))

app.post('/posts', (req, res) => postPost(req, res))

app.get('/posts/:id', (req, res) => getPostByID(req, res))

app.delete('/posts/:id', (req, res) => deletePost(req, res))

app.patch('/posts/:id/publish', (req, res) => patchPost(req, res))

app.put('/posts/:id', (req, res) => putPost(req, res))

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})