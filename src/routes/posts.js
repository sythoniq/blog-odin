const { Router } = require("express")
const posts = Router()

posts.get("/", (req, res) => res.send("Read a post"))

module.exports = posts;
