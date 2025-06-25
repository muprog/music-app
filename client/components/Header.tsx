import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='flex justify-between items-center mb-6'>
      <h1 className='text-3xl font-bold'>🎵 Music Library</h1>
      <Link
        href='/create'
        className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
      >
        + Create Song
      </Link>
    </header>
  )
}
