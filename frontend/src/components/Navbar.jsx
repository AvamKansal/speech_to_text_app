import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate =useNavigate();
  const token =localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg sticky top-0 z-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer"
        onClick={() => navigate("/")}>
        Transcripto AI
      </h1>
      <div className="flex gap-4">
        {!token ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:text-blue-400 transition-all">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-xl text-white hover:scale-105 transition-all">
              Sign Up
            </button>
            </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white transition-all">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;