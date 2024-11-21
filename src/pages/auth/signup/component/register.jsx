import { useState } from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/auth/register",
        { name, email, phone, password, role: "Visitor" },
        { withCredentials: true }
      )
      .then(() => {
        setLoading(false);
        messageApi.open({
          type: "success",
          content: "Welcome! We’re excited to have you onboard 😊",
          duration: 4,
        });
        setTimeout(() => {
          router.push("/auth/signin");
        }, 4500);
      })
      .catch((err) => {
        setLoading(false);
        const errorMessage =
          err.response?.status === 400
            ? "Oops! It looks like this user already exists 😊. Please head to the Sign In page and enter your information again 😁."
            : "Looks like an error occurred 😭. Please try again later 😣.";

        messageApi.open({
          type: "error",
          content: errorMessage,
          duration: 2,
        });
      });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] max-w-md">
      {contextHolder}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Hello Register Here Now !! 🥳
      </h2>
      <p className="text-center text-gray-800">
        🎉 Welcome! We're thrilled to have you join us. Please enter your
        information to sign up and let's embark on something amazing together!
        🚀😊
      </p>
      <form onSubmit={handleSubmit} className="mt-20">
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            id="name"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="628xxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
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

        {/* Submit Button */}
        <div>
          {loading ? (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Please Wait our system is processing🤗
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
