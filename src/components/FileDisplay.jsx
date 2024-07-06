import { FileAudio2, FilePenLine, PenLine } from 'lucide-react'
import React from 'react'

function FileDisplay({ file, audioStream, handleAudioReset }) {
  return (
    <main className='flex-1 p-4 flex flex-col justify-center items-center gap-3 sm:gap-4 pb-20 w-72 sm:w-96 max-w-full mx-auto'>
      <h1 className='font-bold text-4xl sm:text-5xl md:text-6xl'>Your <span className='text-blue-400'>file</span></h1>
      <div className='flex items-center gap-2'>
        <FileAudio2 />
        <p>{file ? file.name : 'Custom-audio.mp3'}</p>
      </div>
      <div className='flex items-center justify-between gap-20'>
        <button onClick={handleAudioReset} className='text-slate-400 hover:text-blue-400 duration-200'>Reset</button>
        <button className='specialBtn p-2 px-3 rounded-lg text-blue-400 flex gap-2 font-medium'>
          Transcribe
          <FilePenLine />
        </button>
      </div>
    </main>
  )
}

export default FileDisplay