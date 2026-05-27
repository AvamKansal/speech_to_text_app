function TranscriptBox({ transcription }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        AI Transcription
      </h2>
      <div className="bg-zinc-900 rounded-2xl p-6 min-h-[180px] text-gray-300 leading-8">
        {transcription ||
          "Your transcription will appear here..."}
      </div>
    </div>
  );
}

export default TranscriptBox;