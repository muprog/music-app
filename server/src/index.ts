import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/route'
import path from 'path'
const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/', router)
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
  console.log('mongodb connected.')
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
  })
})
