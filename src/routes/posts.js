const passport = require('passport');
const { Router } = require("express")
const posts = Router()
const controller = require('../controllers/postsCont.js')

posts.get("/", controller.getAllPosts);
posts.get("/:postId", controller.viewPost)
posts.get("/:postId/comments", controller.getPostComments)

posts.post("/create", passport.authenticate('jwt', {session: false}), controller.uploadPost);
posts.post("/post/:postId/comment", passport.authenticate('jwt', {session: false}), controller.commentOnPost);

module.exports = posts;
