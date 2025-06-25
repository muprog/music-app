import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log('mongodb connected.')
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
  })
})
