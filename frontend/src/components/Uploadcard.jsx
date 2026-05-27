import {
  FaMicrophone,
  FaUpload,
}
from "react-icons/fa";
function UploadCard({
  handleFileChange,
  startRecording,
  stopRecording,
  recording,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Upload */}
        <label className="flex-1 cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition-all p-6 rounded-2xl flex flex-col items-center justify-center border border-dashed border-gray-500">
          <FaUpload className="text-3xl text-white mb-4" />
          <p className="text-white">
            Upload Audio
          </p>
          <input
            type="file"
            accept="audio/*"
            hidden
            onChange={handleFileChange}
          />
        </label>
        {/* Recording */}
        {!recording ? (
          <button
            onClick={startRecording}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white hover:scale-105 transition-all"
          >
            <FaMicrophone className="text-3xl mx-auto mb-4" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex-1 bg-red-500 rounded-2xl p-6 text-white hover:scale-105 transition-all"
          >
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadCard;