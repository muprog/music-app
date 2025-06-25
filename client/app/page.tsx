// 'use client'

// import { useRouter } from 'next/navigation'

// export default function Home() {
//   const router = useRouter()

//   return (
//     <main className='flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center'>
//       <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
//         🎵 Welcome to Music App
//       </h1>
//       <p className='text-lg md:text-xl text-gray-600 mb-6'>
//         Manage your favorite songs, albums, and artists all in one place.
//       </p>
//       <button
//         onClick={() => router.push('/songs')}
//         className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition'
//       >
//         View Songs
//       </button>
//     </main>
//   )
// }

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

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    axios.get('/all').then((res) => setSongs(res.data))
  }, [])

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <Header />
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
