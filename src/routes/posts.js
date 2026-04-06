const { Router } = require("express")
const posts = Router()
const controller = require('../controllers/postsCont.js')

posts.get("/", controller.getAllPosts);
posts.get("/:postId", controller.viewPost)
posts.get("/:postId/comments", controller.getPostComments)

posts.post("/create", controller.uploadPost);
posts.post("/create/:postId/comment", controller.commentOnPost);

module.exports = posts;
