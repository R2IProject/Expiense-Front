import { useState } from "react";
import { message } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ token: res.data.token, role: res.data.role })
        );
        messageApi.open({
          type: "success",
          content: "Welcome! We’re excited to have you onboard 😊",
          duration: 2,
        });
        setTimeout(() => {
          router.push("/dashboard/overview");
        }, 2500);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const { response } = err;
        if (response) {
          const messageMap = {
            400: "Oops! Something seems off with the details you provided. Please double-check and try again 😅",
            404: "It looks like you’re not registered yet! Why not join us and sign up? 🤗",
            500: "Uh-oh, something went wrong on our end. Please try again later or reach out for help. We’re here for you! 😔",
          };

          messageApi.open({
            type: "error",
            content:
              messageMap[response.status] ||
              "An unexpected error occurred. Please try again later 😣.",
          });
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] max-w-md">
      {contextHolder}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back !! 🥳
      </h2>
      <p className="text-center text-gray-800">
        🎉 Welcome! We're excited to have you here. Please enter your
        information to sign in and let's get started on something amazing! 🚀😊
      </p>
      <p className="text-center text-gray-800 mt-10">
        No account?{" "}
        <Link href="/auth/signup">
          <span className="text-blue-500 hover:underline">Register</span>
        </Link>{" "}
        now and join our community! 🎉
      </p>
      <form onSubmit={handleSubmit} className="mt-5">
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
