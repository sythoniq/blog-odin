const jwt = require('jsonwebtoken')
const prisma = require('../configs/prisma.js')

async function register(req, res, next) {
  try {
    await prisma.user.create({
      data: {
        username: req.body.username,
        userhash: req.body.password
      }
    })    
    res.redirect("/")
  } catch(error) {
    next(error)
  }
}

async function login(req, res, next) {
  const user = {
    name: "Someone there"
  }
  jwt.sign({ user }, 'somesecret', (err, token) => {
    res.json({token})
  }); 
}

module.exports = {
  register,
  login
}
