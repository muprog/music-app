import mongoose from 'mongoose'

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String },
    audio: { type: String },
  },
  {
    timestamps: true,
  }
)

export const Song = mongoose.model('Song', songSchema)
