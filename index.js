const express = require('express');
const posts = require('./data')

const app = express();
app.use(express.json());

app.get('/posts', (req, res) => {
    res.json(posts);
})

function validatePost(post){
    if (3 <= post.title.length 
        && post.title.length <= 120 
        && post.content.length > 10 
        && post.author.length > 0){
        return true
    }
    return false
}

app.post('/posts', (req, res) => {
    newPost = req.body
    if (validatePost(newPost)){
        newPost.id = posts.length > 0 ? Math.max(...posts.map(t => t.id)) + 1 : 1
        newPost.createdAt = (new Date).toISOString()
        newPost.updatedAt = (new Date).toISOString()
        newPost.published = false
        posts.push(newPost)
        }
    else{
        res.status(400).json({message: 'Invalid JSON'})
        return
    }
    res.status(201).json(newPost)
})
app.get('/posts/:id', (req, res) =>{
    const postID = parseInt(req.params.id)
    const post = posts.find(t => t.id === postID)

    if (!post){
        res.status(404).json({message: 'Post not found'})
    }
    else{
        res.status(201).json(post)
    }
})

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})