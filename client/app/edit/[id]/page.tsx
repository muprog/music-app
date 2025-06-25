'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from '../../../utils/axios'

interface FormDataType {
  title: string
  artist: string
  album: string
  genre: string
}

export default function EditSongPage() {
  const { id } = useParams()
  const router = useRouter()

  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    artist: '',
    album: '',
    genre: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [audio, setAudio] = useState<File | null>(null)

  useEffect(() => {
    if (!id) return
    axios
      .get(`/songs/${id}`)
      .then((res) => {
        const { title, artist, album, genre } = res.data
        setFormData({ title, artist, album, genre })
      })
      .catch((err) => {
        console.error(err)
        alert('Failed to fetch song data.')
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })
    if (image) data.append('image', image)
    if (audio) data.append('audio', audio)

    try {
      await axios.put(`/songs/${id}`, data)
      router.push('/manage')
    } catch (err) {
      console.error(err)
      alert('Update failed.')
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Edit Song</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
          className='input border p-2 rounded'
          required
        />
        <input
          type='text'
          name='artist'
          placeholder='Artist'
          value={formData.artist}
          onChange={handleChange}
          className='input border p-2 rounded'
          required
        />
        <input
          type='text'
          name='album'
          placeholder='Album'
          value={formData.album}
          onChange={handleChange}
          className='input border p-2 rounded'
          required
        />
        <input
          type='text'
          name='genre'
          placeholder='Genre'
          value={formData.genre}
          onChange={handleChange}
          className='input border p-2 rounded'
          required
        />
        <label className='text-sm font-medium'>Replace Image (optional)</label>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <label className='text-sm font-medium'>Replace Audio (optional)</label>
        <input
          type='file'
          accept='audio/*'
          onChange={(e) => setAudio(e.target.files?.[0] || null)}
        />
        <button
          type='submit'
          className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Update Song
        </button>
      </form>
    </div>
  )
}
