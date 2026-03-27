require('dotenv').config()

const cors = require('cors') // an npm module for cors, -_-
const express = require("express")
const app = express()

// adding some middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const index = require("./routes/index")
const posts = require('./routes/posts')

app.use("/", index)
app.use("/posts", posts)

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.error(error)
  }

  console.log(`Server live on localhost:${process.env.PORT}`)
})
