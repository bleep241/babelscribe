import { Plus } from 'lucide-react';
import React from 'react';

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
      <a href="/"><h1 className='font-medium'>Babel<span className='text-indigo-600 bold'>Scribe</span></h1></a>
      <div className='gap-4 flex items-center '>
        <a href="/" className='flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-indigo-600'>
          <p>New</p>
          <Plus />
        </a>
      </div>
    </header>
  )
}
