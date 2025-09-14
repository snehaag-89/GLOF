import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios"; // tumhari axios instance

const Login = () => {
    const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // backend API call
      const res = await axios.post("/api/auth/login", formData);

      // token + user save
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.reply));
      localStorage.setItem("loginTime", Date.now());

      setMessage("Logged in successfully!");
      setIsSuccess(true);

      // navigate after 1 sec
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
        setError("Invalid email or password");
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-lg w-full transition-all duration-500 hover:shadow-2xl border border-gray-200">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
           Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Log in to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600  text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100"
          >
            Log In
          </button>

        </form>

      

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link to="/auth" className="text-blue-500 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
