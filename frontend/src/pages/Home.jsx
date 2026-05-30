import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadCard from "../components/Uploadcard";
import TranscriptBox from "../components/TranscriptBox";
import LiveTranscript from "../components/LiveTranscript";
import History from "../components/History";

function Home() {

  const [selectedFile, setSelectedFile] = useState(null);

  const [transcription, setTranscription] = useState("");

  const [history, setHistory] = useState([]);

  const [liveText, setLiveText] = useState("");

  const [recording, setRecording] = useState(false);

  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);

  const audioChunksRef = useRef([]);

  // Fetch History
  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/upload/history"
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchHistory();

  }, []);

  // File Upload
const handleFileChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;
  const maxSize = 10 * 1024 * 1024;

if (file.size > maxSize) {

  toast.error(
    "File size must be less than 10MB"
  );

  return;
}

  if (
    !file.type.startsWith("audio/")
  ) {

    toast.error(
      "Please upload audio file only"
    );

    return;
  }

  setSelectedFile(file);

  toast.success(
    "Audio selected successfully"
  );
};

  // Upload Audio
  const uploadAudio = async () => {

    if (!selectedFile) {

      toast.error("Please select audio file");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "audio",
        selectedFile
      );

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setTranscription(
        response.data.transcription
      );

      fetchHistory();

      toast.success(
        "Transcription generated"
      );

    } catch (error) {

      console.log(error);

toast.error(
  error.response?.data?.error ||
  "Something went wrong"
);

    } finally {

      setLoading(false);
    }
  };

  // Recording
  const startRecording = async () => {

    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

    const mediaRecorder =
      new MediaRecorder(stream);
    mediaRecorderRef.current =
      mediaRecorder;
    audioChunksRef.current = [];
    mediaRecorder.ondataavailable =
      (event) => {
        audioChunksRef.current.push(
          event.data
        );
      };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current,{
          type: "audio/wav",
        }
      );
      const audioFile = new File(
        [audioBlob],
        "recording.wav"
      );
      setSelectedFile(audioFile);
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

  // Browser support validation
  if (
    !window.SpeechRecognition &&
    !window.webkitSpeechRecognition
  ) {

    toast.error(
      "Speech Recognition not supported in this browser"
    );

    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex;i < event.results.length;i++) {
      transcript +=event.results[i][0].transcript;
    }
    setLiveText(transcript);
  };
  recognition.start();
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <Hero />
        <UploadCard
          handleFileChange={handleFileChange}
          startRecording={startRecording}
          stopRecording={stopRecording}
          recording={recording}
        />
        {selectedFile && (
          <p className="text-gray-400 mt-4 text-center">Selected File:
            {" "}
            {selectedFile.name}
          </p>
        )}
        <div className="mt-6 flex justify-center">
          <button
            onClick={uploadAudio}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {loading
              ? "Generating AI Transcript..."
              : "Generate Transcription"}
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={startLiveTranscription}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:scale-105 transition-all">
            Start Live Speech
          </button>
        </div>

        <LiveTranscript
          liveText={liveText}
        />
        <TranscriptBox
          transcription={transcription}
        />
        <History history={history} />
      </div>
    </div>
  );
}

export default Home;