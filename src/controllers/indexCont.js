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
  console.log(req)
  res.status(200).send('Render home page or login page')
}

async function getRegister(req, res, next) {
  res.status(200).send("Render sign up page")
}

async function postRegister(req, res, next) {
  const hashedpass = await bcrypt.hash(req.body.password, 10);

  try {
    await prisma.user.create({
      data: {
        username: req.body.username,
        userhash: hashedpass 
      }
    })
    res.status(200).send("User registerd successfully")
  } catch(err) {
    res.status(200).send("User not registered")
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
      res.status(401).send({success: false, msg: "User not found"}) 
    } 

    const isvalid = await bcrypt.compare(req.body.password, user.userhash);
    if (isvalid) {
      console.log(req)
      const signedToken = issueJWT(user);
      res.status(200).send({ success: true, token: signedToken.token, expiresIn:signedToken.expires})
    } else {
      res.status(401).send({success: false, msg: "Incorrect password"})
    }
  } catch(err) {
    next(err);
  }
}

module.exports = {
  root,
  getRegister,
  postRegister,
  handleLogin
}
