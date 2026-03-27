const { Router } = require('express')
const index = Router()

index.get("/", (req, res) => res.send("Getting Started"))

module.exports = index;
