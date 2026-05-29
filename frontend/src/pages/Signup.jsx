import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // Handle Signup
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      // Validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.password
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await axios.post(
            "http://localhost:5000/auth/signup",
            formData
          );

        toast.success(
          response.data.message
        );

        // Redirect to login
        navigate("/login");

      } catch (error) {

        toast.error(

          error.response?.data?.error ||

          "Signup failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-md shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-white text-center mb-8">

          Create Account

        </h1>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-4 outline-none border border-zinc-700 focus:border-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-4 outline-none border border-zinc-700 focus:border-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-6 outline-none border border-zinc-700 focus:border-blue-500"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50"
        >

          {loading
            ? "Creating Account..."
            : "Signup"}

        </button>

        {/* Login Redirect */}
        <p className="text-gray-400 text-center mt-6">

          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 ml-2 cursor-pointer hover:underline"
          >

            Login

          </span>

        </p>

      </form>

    </div>
  );
}

export default Signup;