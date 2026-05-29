function Navbar() {

  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg sticky top-0 z-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Transcripto AI
      </h1>
      <div className="flex gap-4">
        <button className="text-white hover:text-blue-400 transition-all">
          Login
        </button>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-xl text-white hover:scale-105 transition-all">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;