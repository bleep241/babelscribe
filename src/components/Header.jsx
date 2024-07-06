import React from 'react'
import { Plus } from 'lucide-react'


function Header() {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
      <h1 className='font-medium'>Echo<span className='text-blue-400'>Scribe</span></h1>
      <button className='flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400'>
        <p>New</p>
        <Plus />
      </button>
    </header>
  )
}

export default Header