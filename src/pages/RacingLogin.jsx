import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ApiService from "../ApiService";
import { setGlobalRacerId } from "../GlobalVariable";

const RacingLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { email, password } = formData;

    // ✅ Admin override logic
    if (email === "admin@gmail.com" && password === "12345678") {
      navigate("/admindashboard");
      return;
    }

    try {
      const result = await ApiService.login(email, password);

      if (result && result.user_id) {
        setGlobalRacerId(result.user_id);
        localStorage.setItem("access_token", result.access_token);
        navigate("/profile");
      } else {
        setError("Login failed: No user ID returned.");
      }
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 my-20">
      <div className="flex">
        <h1 className="header-title mx-auto">LOGIN TO YOUR RACER PROFILE</h1>
      </div>
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                className="w-full p-4 rounded-md bg-gray-100"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="PASSWORD"
                  className="w-full p-4 rounded-md bg-gray-100"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary mt-6">
              LOGIN
            </button>

            <div className="flex justify-between items-center mt-4 text-sm">
              <Link to="/register" className="text-red-600 hover:text-red-700">
                Want to Register as a Racer?
              </Link>
              <Link
                to="/forgot-password"
                className="text-gray-600 hover:text-gray-700"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RacingLogin;
