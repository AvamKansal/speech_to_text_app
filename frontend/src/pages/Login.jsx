import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate =useNavigate();
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response =
          await axios.post(
            `${API_URL}/auth/login`,
            formData
          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        toast.success(
          "Login successful"
        );

        navigate("/");
      } catch (error) {
        toast.error(
          error.response?.data?.error ||
          "Login failed"
        );
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-10 rounded-3xl w-[400px] border border-zinc-800">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Login
        </h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-4 outline-none"
          onChange={handleChange}/>
       
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-6 outline-none"
          onChange={handleChange}/>

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;