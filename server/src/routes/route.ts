import express from 'express'
import cors from 'cors'
import { upload } from '../middleware/upload'
const {
  test,
  createSong,
  getAllSongs,
  deleteSong,
  getSongById,
  updateSong,
} = require('../controllers/controller')

const router = express.Router()

router.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
)

router.get('/', test)
router.post(
  '/create',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  createSong
)
router.get('/all', getAllSongs)
router.delete('/songs/:id', deleteSong)
router.get('/songs/:id', getSongById)
router.put(
  '/songs/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  updateSong
)
export default router
