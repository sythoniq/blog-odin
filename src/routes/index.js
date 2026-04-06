const passport = require("passport")
const { Router } = require('express')
const controller = require('../controllers/indexCont')
const index = Router()

index.get("/", passport.authenticate('jwt', {session: false}), controller.root);
index.get("/sign-up", controller.getRegister)

index.post("/sign-up", controller.postRegister)
index.post("/login", controller.handleLogin)

module.exports = index;
