require('dotenv').config()

const jwt = require('jsonwebtoken')
const prisma = require("../configs/prisma.js")
const bcrypt = require('bcryptjs')

function issueJWT(user) {
  const id = user.userId
  const expiresIn = '1d'

  const payload = {
    sub: id,
    iat: Date.now()
  }

  const token = jwt.sign(payload, process.env.SECRET, {expiresIn})

  return {
    token: 'Bearer ' + token,
    expires: expiresIn
  }
}

async function root(req, res, next) {
  res.status(200).json({success: true, msg: "Login page"}) 
}

async function getRegister(req, res, next) {
  res.status(200).json({success: true, msg: "Render sign up page"})
}

async function postRegister(req, res, next) {
  const hashedpass = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        userhash: hashedpass 
      }
    })
    res.status(200).json({success: true, user})
  } catch(err) {
    res.status(500).json({success: false, err})
  }
}

async function handleLogin(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    })
    
    if (!user) {
      res.status(401).json({success: false, msg: "User not found"}) 
    } 

    const isvalid = await bcrypt.compare(req.body.password, user.userhash);
    if (isvalid) {
      const signedToken = issueJWT(user);
      res.status(200).json({ success: true, token: signedToken.token, expiresIn:signedToken.expires})
    } else {
      res.status(401).json({success: false, msg: "Incorrect password"})
    }
  } catch(err) {
    res.status(500).json({success: false, err})
  }
}

module.exports = {
  root,
  getRegister,
  postRegister,
  handleLogin
}
