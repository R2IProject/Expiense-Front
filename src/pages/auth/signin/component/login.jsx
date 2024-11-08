import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as making an API request
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back !! 🥳
      </h2>
      <p className="text-center text-gray-800">
        🎉 Welcome! We're excited to have you here. Please enter your
        information to sign in and let's get started on something amazing! 🚀😊
      </p>
      <form onSubmit={handleSubmit} className="mt-20">
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Forgot password? */}
        <div className="flex items-center justify-between mb-4">
          <a href="#" className="text-blue-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
