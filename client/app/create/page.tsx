'use client'
import axios from '../../utils/axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateSong() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [audio, setAudio] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   const data = new FormData()
  //   Object.entries(formData).forEach(([key, value]) => {
  //     data.append(key, value)
  //   })
  //   if (image) data.append('image', image)
  //   if (audio) data.append('audio', audio)

  //   try {
  //     await axios.post('/create', data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })

  //     router.push('/')
  //   } catch (err) {
  //     console.error('Upload failed:', err)
  //     alert('Upload failed.')
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true) // ⬅️ Start loading

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })
    if (image) data.append('image', image)
    if (audio) data.append('audio', audio)

    try {
      await axios.post('/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      router.push('/')
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Upload failed.')
      setLoading(false) // ⬅️ Stop loading if error
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Create Song</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='title'
          placeholder='Title'
          className='input'
          required
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type='text'
          name='artist'
          placeholder='Artist'
          className='input'
          required
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type='text'
          name='album'
          placeholder='Album'
          className='input'
          required
          onChange={handleChange}
          disabled={loading}
        />
        <input
          type='text'
          name='genre'
          placeholder='Genre'
          className='input'
          required
          onChange={handleChange}
          disabled={loading}
        />
        <label className='block text-sm font-medium text-gray-700'>
          Cover Image
        </label>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
          disabled={loading}
        />
        <label className='block mt-4 text-sm font-medium text-gray-700'>
          Audio File
        </label>
        <input
          type='file'
          accept='audio/*'
          onChange={(e) => setAudio(e.target.files?.[0] || null)}
          required
          disabled={loading}
        />

        {/* <button
          type='submit'
          className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Upload
        </button> */}
        <button
          type='submit'
          disabled={loading}
          className={`${
            loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-2 rounded`}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}
