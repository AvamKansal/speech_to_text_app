function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
      <h1 className="text-2xl font-bold text-white">
        VoiceScript AI
      </h1>
      <div className="flex gap-4">
        <button className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:scale-105 transition-all">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;