const posts = require('../data')

function validatePost(post){
    if (3 <= post.title.length 
        && post.title.length <= 120 
        && post.content.length > 10 
        && post.author.length > 0){
        return true
    }
    return false
}

const getPosts = (req, res) => {
    const publishedPosts = posts.filter( (post) => {return post.published === true})
    res.json(publishedPosts);
}

const getPostByID = (req, res) => {
    const postID = parseInt(req.params.id)
    const post = posts.find(t => t.id === postID)

    if (!post){
        res.status(404).json({message: 'Post not found'})
    }
    else{
        res.status(201).json(post)
    }
}

const postPost = (req, res) => {
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
}

const putPost = (req, res) => {
    const id = parseInt(req.params.id)
    const index = posts.findIndex(t => t.id === id)
    postUpdate = req.body
    if (validatePost(postUpdate)){
        console.log('jtuejwhnwe')
        posts[index].title = postUpdate.title
        posts[index].content = postUpdate.content
        posts[index].author = postUpdate.author
        posts[index].published = postUpdate.published
        posts[index].updatedAt = (new Date()).toISOString()
        
        res.status(200).json(posts[index])
    }
}

const patchPost = (req, res) => {
    const {published} = req.body
    if (!published){
        res.status(400).json({message: 'published required'})
    }
    const id = parseInt(req.params.id)
    const index = posts.findIndex(t => t.id === id)

    if (index < 0){
        res.status(404).json({message: 'Post not found'})
    }
    else{
        if (posts[index].published === false){
            posts[index].published = true
        }
        else {
            posts[index].published = false
        }
        posts[index].updatedAt = (new Date).toISOString()
        res.status(201).json(posts[index])
    }
}

const deletePost = (req, res) => {
    const id = parseInt(req.params.id)
    const index = posts.findIndex(t => t.id === id)
    if (index !== -1) {
        posts.splice(index, 1)
        res.status(204).json({message: 'Post has been deleted'})
    } else {
        res.status(404).json({message: 'Post not found'})
    }
}

module.exports = {
    getPosts,
    getPostByID,
    postPost,
    patchPost,
    putPost,
    deletePost
}