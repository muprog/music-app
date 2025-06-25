// import { Request, Response } from 'express'
// import { Song } from '../models/Song'
// const test = (req: Request, res: Response) => {
//   res.send('hello')
// }
// const createSong = async (req: Request, res: Response) => {
//   try {
//     const { title, artist, album, genre } = req.body

//     const files = req.files as { [fieldname: string]: Express.Multer.File[] }

//     const imageFile = files['image']?.[0]
//     const audioFile = files['audio']?.[0]

//     const newSong = new Song({
//       title,
//       artist,
//       album,
//       genre,
//       image: imageFile?.filename || '',
//       audio: audioFile?.filename || '',
//     })

//     await newSong.save()
//     res.status(201).json(newSong)
//   } catch (err) {
//     res.status(500).json({ error: 'Upload failed' })
//   }
// }
// module.exports = {
//   test,
//   createSong,
// }

// src/controllers/controller.ts
import { Request, Response } from 'express'
import { Song } from '../models/Song'
import path from 'path'
import fs from 'fs'

export const test = (req: Request, res: Response) => {
  res.send('hello')
}

export const createSong = async (req: Request, res: Response) => {
  try {
    const { title, artist, album, genre } = req.body

    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    const imageFile = files['image']?.[0]
    const audioFile = files['audio']?.[0]

    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      image: imageFile?.filename || '',
      audio: audioFile?.filename || '',
    })

    await newSong.save()
    res.status(201).json(newSong)
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' })
  }
}
export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find()
    res.json(songs)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' })
  }
}

export const deleteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id)
    if (!song) {
      return res.status(404).json({ message: 'Song not found' })
    }

    if (song.image) {
      const imagePath = path.join(__dirname, '../../uploads/images', song.image)
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
    }

    if (song.audio) {
      const audioPath = path.join(__dirname, '../../uploads/audio', song.audio)
      if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath)
    }

    await song.deleteOne()

    res.json({ message: 'Song deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to delete song' })
  }
}
export const getSongById = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id)
    if (!song) return res.status(404).json({ message: 'Song not found' })
    res.json(song)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching song' })
  }
}

export const updateSong = async (req: Request, res: Response) => {
  try {
    const { title, artist, album, genre } = req.body
    const song = await Song.findById(req.params.id)

    if (!song) {
      return res.status(404).json({ message: 'Song not found' })
    }

    // Type guard for multer files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    // Replace image if new one uploaded
    if (files?.image?.[0]) {
      if (song.image) {
        const oldImagePath = path.join(
          __dirname,
          '../../uploads/images',
          song.image
        )
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath)
      }

      song.image = files.image[0].filename
    }

    // Replace audio if new one uploaded
    if (files?.audio?.[0]) {
      if (song.audio) {
        const oldAudioPath = path.join(
          __dirname,
          '../../uploads/audio',
          song.audio
        )
        if (fs.existsSync(oldAudioPath)) fs.unlinkSync(oldAudioPath)
      }

      song.audio = files.audio[0].filename
    }

    // Update text fields
    song.title = title
    song.artist = artist
    song.album = album
    song.genre = genre

    await song.save()
    return res.json(song)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to update song' })
  }
}
