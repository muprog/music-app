import express from 'express'
import cors from 'cors'
const router = express.Router()
const { test } = require('../controllers/controller')
router.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
)

router.get('/', test)
