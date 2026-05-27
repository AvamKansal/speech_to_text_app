import { useState, useRef } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadCard from "../components/UploadCard";
import TranscriptBox from "../components/TranscriptBox";
import LiveTranscript from "../components/LiveTranscript";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [liveText, setLiveText] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // File Upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];
    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // Live Speech Recognition
  const startLiveTranscription = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      let transcript = "";
      for(let i = event.resultIndex; i<event.results.length; i++){
        transcript += event.results[i][0].transcript;
      }
      setLiveText(transcript);
    };
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-6">
        <Hero/>
        <UploadCard
          handleFileChange={handleFileChange}
          startRecording={startRecording}
          stopRecording={stopRecording}
          recording={recording}
        />
        <div className="mt-6">
          <button
            onClick={startLiveTranscription}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:scale-105 transition-all">
            Start Live Speech
          </button>
        </div>
        <LiveTranscript liveText={liveText} />
        <TranscriptBox
          transcription={transcription}
        />
      </div>
    </div>
  );
}

export default Home;