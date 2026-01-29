import React, { useState, useRef } from 'react';
import { Video, Mic, Baby } from 'lucide-react';

export default function MimicTab() {
  const [isMicActive, setIsMicActive] = useState(false);
  const [isCamActive, setIsCamActive] = useState(false);
  const [audioStatus, setAudioStatus] = useState("Ready");
  const [isRecording, setIsRecording] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const toggleCamera = async () => {
    if (isCamActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCamActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCamActive(true);
      } catch (err) {
        console.error("Camera access denied", err);
        alert("Could not access camera. Please allow permissions.");
      }
    }
  };

  const startMimicLoop = async () => {
    if (isRecording) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        setAudioStatus("Repeating...");
        
        audio.playbackRate = 1.2; 
        audio.play().catch(e => console.log("Autoplay blocked:", e));

        audio.onended = () => {
          setAudioStatus("Listening...");
          if (isMicActive) {
            // Re-trigger loop if still active
            setTimeout(() => {
               if (mediaRecorderRef.current?.state === "inactive" && isMicActive) {
                 mediaRecorderRef.current.start();
                 setAudioStatus("Listening...");
                 setIsRecording(true);
                 setTimeout(() => {
                    if (mediaRecorderRef.current?.state === "recording") {
                       mediaRecorderRef.current.stop();
                       setIsRecording(false);
                    }
                 }, 3000); 
               }
            }, 500);
          }
        };
      };

      setIsMicActive(true);
      setAudioStatus("Listening...");
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto stop after 3 seconds
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            setIsRecording(false);
        }
      }, 3000);

    } catch (err) {
      console.error("Mic access denied", err);
      alert("Could not access microphone.");
    }
  };

  const stopMimicLoop = () => {
    setIsMicActive(false);
    setAudioStatus("Ready");
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    // Note: We don't stop the tracks here to keep camera active if user wants, 
    // but the original code also didn't explicitly close audio stream tracks.
    // For a cleaner implementation, one might want to close the audio tracks.
  };

  return (
    <>
      <div className="flex-1 relative bg-black flex flex-col items-center justify-center overflow-hidden w-full h-full">
        {/* Camera Feed */}
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${isCamActive ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        {!isCamActive && (
          <div className="text-white text-center p-6 opacity-50 z-10">
            <Baby size={64} className="mx-auto mb-4 text-pink-300" />
            <p>Tap camera button to activate Mirror Mode</p>
          </div>
        )}

        {/* Audio Visualizer Overlay */}
        {isMicActive && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 px-6 py-2 rounded-full backdrop-blur-sm z-20">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${audioStatus === 'Listening...' ? 'bg-pink-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-white font-mono text-sm">{audioStatus}</span>
              {audioStatus === 'Repeating...' && (
                  <div className="flex gap-1 h-3 items-end">
                      <div className="w-1 bg-white animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-1 bg-white animate-bounce" style={{animationDelay: '100ms'}}></div>
                      <div className="w-1 bg-white animate-bounce" style={{animationDelay: '200ms'}}></div>
                  </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white p-4 border-t border-cyan-100 shrink-0 w-full">
        <div className="flex justify-center mb-6 gap-4">
          <button 
            onClick={toggleCamera} 
            className={`p-4 rounded-full ${isCamActive ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-800 text-white'}`}
          >
            <Video size={24} />
          </button>
          <button 
            onClick={isMicActive ? stopMimicLoop : startMimicLoop} 
            className={`p-4 rounded-full ${isMicActive ? 'bg-pink-100 text-pink-600 animate-pulse' : 'bg-slate-800 text-white'}`}
          >
            <Mic size={24} />
          </button>
        </div>
      </div>
    </>
  );
}