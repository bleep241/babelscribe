import { MicVocal, MoveRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

function HomePage({ setFile, setAudioStream }) {
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = 'audio/webm';

  async function startRecording() {
    let tempStream;
    console.log('Start Recording...');

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      tempStream = streamData;
    } catch (error) {
      console.log("Error starting recording:", error);
      return
    }

    setRecordingStatus('recording');

    // creates a new media recorder instance uding the stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return
      if (event.data.size === 0) return

      localAudioChunks.push(event.data);
    }

    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus('inactive');
    console.log("Stopping recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    }
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') return;

    const interval = setInterval(() => {
      setDuration(curr => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  })

  return (
    <main className='flex-1 p-4 flex flex-col justify-center items-center gap-3 sm:gap-4 pb-20'>
      <h1 className='font-bold text-5xl sm:text-6xl md:text-7xl'>Echo<span className='text-blue-400'>Scribe</span></h1>
      <h3 className='font-medium flex md:text-lg'>Record <MoveRight className='text-blue-400 mx-2 my-1' /> Transcribe <MoveRight className='text-blue-400 mx-2 my-1' /> Translate
      </h3>
      <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl'>
        <p className='text-blue-400'>
          {recordingStatus === 'inactive' ? 'Record' : `Stop recording`}
        </p>
        <div className='flex items-center gap-2'>
          {duration !== 0 && (
            <p className='text-sm'>{duration}s</p>
          )}
          <MicVocal className={'size-4 duration-200 ' + (recordingStatus === 'recording' ? 'text-rose-400' : '')} />
        </div>
      </button>
      <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input onChange={(e) => {
        const tempFile = e.target.files[0];
        setFile(tempFile);
      }} className='hidden' type='file' accept='.mp3,.wave' /></label>
        an mp3 file</p>
    </main>
  )
}

export default HomePage