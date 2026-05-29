function TranscriptBox({
  transcription,
}) {

  return (

    <div className="mt-10 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-bold text-white mb-6">

        Generated Transcript

      </h2>

      <p className="text-gray-300 leading-8 whitespace-pre-wrap">

        {transcription || "Your transcription will appear here..."}

      </p>

    </div>
  );
}

export default TranscriptBox;