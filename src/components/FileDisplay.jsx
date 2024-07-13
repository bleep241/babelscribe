import { FilePenLine } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

export default function FileDisplay(props) {
  const { handleAudioReset, file, audioStream, handleFormSubmission } = props;
  const audioRef = useRef();

  useEffect(() => {
    if (!file && !audioStream) {
      return;
    }
    if (file) {
      audioRef.current.src = URL.createObjectURL(file);
    } else {
      audioRef.current.src = URL.createObjectURL(audioStream);
    }
  }, [audioStream, file]);


  return (
    <main className='flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-full max-w-prose mx-auto'>
      <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your <span className='text-indigo-600 bold'>File</span></h1>
      <div className=' flex flex-col text-left my-4'>
        <h3 className='font-semibold'>Name</h3>
        <p className='truncate'>{file ? file?.name : 'Custom audio'}</p>
      </div>
      <div className='flex flex-col mb-2'>
        <audio ref={audioRef} className='w-full' controls>
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <button onClick={handleAudioReset} className='text-slate-400 hover:text-indigo-700 duration-200'>Reset</button>
        <button onClick={handleFormSubmission} className='specialBtn  px-3 p-2 rounded-lg text-indigo-600 flex items-center gap-2 font-medium '>
          <p>Transcribe</p>
          <FilePenLine />
        </button>
      </div>
    </main>
  )
}
