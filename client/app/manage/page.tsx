'use client'

import { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import Link from 'next/link'
import Image from 'next/image'

interface Song {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
  image: string
  audio: string
}
const baseURL = process.env.BACKEND_URL || 'https://music-app-7g1a.onrender.com'

export default function ManageSongs() {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    axios.get('/all').then((res) => setSongs(res.data))
  }, [])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this song?')
    if (!confirm) return

    try {
      await axios.delete(`/songs/${id}`)
      setSongs((prev) => prev.filter((song) => song._id !== id))
    } catch (error) {
      alert('Failed to delete song.')
      console.log(error)
    }
  }

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

    // Cleanup listeners
    return () => {
      audios.forEach((audio) => {
        audio.removeEventListener('play', () => {})
      })
    }
  }, [songs])

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-6'>
        <Link className='text-2xl font-bold' href={'/'}>
          Manage Songs
        </Link>
        <Link
          href='/create'
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          + Add New Song
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {songs.map((song) => (
          <div key={song._id} className='border rounded-lg p-4 shadow'>
            <Image
              src={`${baseURL}/uploads/images/${song.image}`}
              alt={song.title}
              className='w-full h-48 object-cover mb-4'
            />
            <h2 className='text-xl font-semibold'>{song.title}</h2>
            <p className='text-gray-600'>
              {song.artist} - {song.album}
            </p>
            <audio
              controls
              src={`${baseURL}/uploads/audio/${song.audio}`}
              className='w-full mt-3'
            />
            <div className='flex justify-between mt-4'>
              <Link
                href={`/edit/${song._id}`}
                className='text-blue-600 hover:underline'
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(song._id)}
                className='text-red-600 hover:underline'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
