function History({ history }) {

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-white mb-6">
        Previous Transcriptions
      </h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item._id}
            className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
            <p className="text-sm text-gray-400">
              {item.fileName}
            </p>
            <p className="text-white mt-2">
              {item.transcription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;