import { useState, useRef } from "react";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);

  const [transcription, setTranscription] = useState("");

  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);

  const audioChunksRef = useRef([]);

  // File Selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Start Recording
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

    mediaRecorder.onstop = () => {

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/wav",
      });

      const audioFile = new File(
        [audioBlob],
        "recording.wav"
      );

      setSelectedFile(audioFile);
    };

    mediaRecorder.start();

    setRecording(true);
  };

  // Stop Recording
  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    setRecording(false);
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Speech To Text App
        </h1>

        {/* File Upload */}
        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Upload Audio File
          </label>

          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Recording Buttons */}
        <div className="flex gap-4 mb-6">

          {!recording ? (
            <button
              onClick={startRecording}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Stop Recording
            </button>
          )}

        </div>

        {/* Selected File */}
        {selectedFile && (
          <div className="mb-6">
            <p className="font-medium">
              Selected File:
            </p>

            <p className="text-gray-600">
              {selectedFile.name}
            </p>
          </div>
        )}

        {/* Transcription */}
        <div>

          <h2 className="text-xl font-semibold mb-2">
            Transcription
          </h2>

          <div className="border rounded-lg p-4 min-h-[120px] bg-gray-50">

            {transcription || "Transcription will appear here..."}

          </div>
        </div>

      </div>

    </div>
  );
}

export default App;