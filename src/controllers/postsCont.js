const prisma = require('../configs/prisma.js')

async function getAllPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({})
    res.status(200).json({success: true, posts})
  } catch(err) {
    res.status(404).json({success: false, err})
  }
}

async function viewPost(req, res, next) {
  try {
    const postId = Number(req.params.postId);
    const post = await prisma.post.findUnique({
      where: {
        postId
      }
    })
    res.status(200).json({success: true, post})
  } catch(err) {
    res.status(404).json({success: false, err})
  }
}

async function getPostComments(req, res, next) {
  try {
    const postId = Number(req.params.postId)
    const comments = await prisma.comment.findMany({
      where: {
        postId 
      }
    })
    res.status(200).json({success: true, comments});
  } catch(err) {
    res.status(404).json({success: false, err})
  }
}

async function uploadPost(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: 4
      }
    }) 
    const { postTitle, postContent } = req.body 
    const post = await prisma.post.create({
      data: {
        postTitle,
        postContent,
        authorId: user.userId
      }
    })
    res.status(200).json({success: true, post})
  } catch(err) {
    console.log(err);
    res.status(404).json({success: false, err})
  }
}

async function commentOnPost(req, res, next) {
    // TO DO 
}

module.exports = {
  getAllPosts,
  viewPost,
  getPostComments,
  uploadPost,
  commentOnPost
}
