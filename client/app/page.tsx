'use client'

import { useEffect, useState } from 'react'
import axios from '../utils/axios' // your axios instance
import Header from '@/components/Header'

interface Song {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  image: string
  audio: string
}

interface Stats {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  songsPerGenre: { _id: string; count: number }[]
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([])
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    axios.get('/all').then((res) => setSongs(res.data))
    axios.get('/stats').then((res) => setStats(res.data))
  }, [])

  useEffect(() => {
    const audios = document.querySelectorAll('audio')

    audios.forEach((audio) => {
      audio.addEventListener('play', () => {
        audios.forEach((otherAudio) => {
          if (otherAudio !== audio) {
            otherAudio.pause()
          }
        })
      })
    })

    return () => {
      audios.forEach((audio) => {
        audio.removeEventListener('play', () => {})
      })
    }
  }, [songs])

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <Header />

      {stats && (
        <div className='bg-gray-100 p-4 rounded shadow mb-8'>
          <h2 className='text-2xl font-bold mb-4 text-center'>📊 Statistics</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4'>
            <div>
              <p className='font-semibold'>Total Songs</p>
              <p>{stats.totalSongs}</p>
            </div>
            <div>
              <p className='font-semibold'>Artists</p>
              <p>{stats.totalArtists}</p>
            </div>
            <div>
              <p className='font-semibold'>Albums</p>
              <p>{stats.totalAlbums}</p>
            </div>
            <div>
              <p className='font-semibold'>Genres</p>
              <p>{stats.totalGenres}</p>
            </div>
          </div>
          <div>
            <h3 className='font-semibold mb-1'>Songs per Genre:</h3>
            <ul className='list-disc list-inside'>
              {stats.songsPerGenre.map((genre) => (
                <li key={genre._id}>
                  {genre._id}: {genre.count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <h1 className='text-3xl font-bold mb-6'>Songs</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {songs.map((song) => (
          <div
            key={song._id}
            className='border rounded-lg p-4 shadow hover:shadow-lg transition'
          >
            <img
              src={`http://localhost:5000/uploads/images/${song.image}`}
              alt={song.title}
              className='w-full h-48 object-cover rounded mb-4'
            />
            <h2 className='text-xl font-semibold'>{song.title}</h2>
            <p className='text-gray-600'>
              {song.artist} - {song.album}
            </p>
            <p className='text-gray-600 italic'>{song.genre}</p>
            <audio
              controls
              src={`http://localhost:5000/uploads/audio/${song.audio}`}
              className='w-full mt-4'
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  )
}
