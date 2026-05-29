function History({ history }) {

  return (

    <div className="mt-14">

      <h2 className="text-4xl font-bold text-white mb-8">

        Previous Transcriptions

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {history.map((item) => (

          <div
            key={item._id}
            className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-all"
          >

            <p className="text-sm text-blue-400">

              {item.fileName}

            </p>

            <p className="text-gray-300 mt-4 leading-7">

              {item.transcription}

            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default History;