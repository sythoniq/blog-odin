const { Router } = require('express')
const controller = require('../controllers/indexCont')
const index = Router()

index.get("/", (req, res) => {
  return res.json({message: "Render home page"})
})
index.get("/sign-up", (req, res) => {
  return res.json({message: "Render register page"})
})
index.get("/login", (req, res) => {
  return res.json({message: "Render login page"})
})

index.post("/sign-up", controller.register)
index.post("/login", controller.login)

module.exports = index;
