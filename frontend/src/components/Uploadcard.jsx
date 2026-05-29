function UploadCard({
  handleFileChange,
  startRecording,
  stopRecording,
  recording,
}) {

  return (
    <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 shadow-2xl">
      <div className="flex flex-col items-center justify-center">
        <label className="w-full border-2 border-dashed border-zinc-700 rounded-3xl p-16 text-center cursor-pointer hover:border-blue-500 transition-all">
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}/>
          <p className="text-gray-300 text-xl">Click to upload audio</p>
        </label>
        <div className="mt-8">
          {!recording ? (
            <button
              onClick={startRecording}
              className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-4 rounded-2xl text-white hover:scale-105 transition-all">
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-600 px-8 py-4 rounded-2xl text-white hover:scale-105 transition-all">
              Stop Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadCard;