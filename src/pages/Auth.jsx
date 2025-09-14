import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",       // ✅ new field added
    password: "",
  });
    
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validatePassword = (pwd) => {
    const upper = /[A-Z]/.test(pwd);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const number = /[0-9]/.test(pwd);
    const minLength = pwd.length >= 8;

    if (!upper || !special || !number || !minLength) {
      return "Your password must include at least one uppercase letter, one number, and one special character.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword(formData.password);
    if (validationError) {
      setError(validationError);
      return;
    } else {
      setError("");
    }

    try {
      const res = await axios.post("/api/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.reply));
      localStorage.setItem("loginTime", Date.now());

      setMessage("Account created successfully!");
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-lg w-full transition-all duration-500 hover:shadow-2xl border border-gray-200">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Register
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Fill in your details to register.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" Enter Email ex-you@example.com"
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="text-sm font-medium text-gray-700 block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address ex-123,street,city"
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 block mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              pattern="[0-9]{10}"   // ✅ ensures 10 digits only
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out text-gray-900"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-lg py-3 px-4 bg-gradient-to-r from-blue-500  to-purple-500   text-white font-bold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
