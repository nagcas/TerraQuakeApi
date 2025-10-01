import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/newsletter/subscribe",
        { email }
      );
      setMessage(response.data.message);
      setIsSuccess(true);
      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-20 flex items-center justify-center bg-gradient-to-r from-[#27035a] via-[#180726] to-[#000000]">
      <div className="w-full max-w-3xl bg-gradient-to-br from-[#1e0341] via-[#180726] to-[#000000] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-2">
              TerraQuake API
            </h2>
            <p className="text-purple-200 text-lg">
              Stay updated with latest news, features, and releases of
              TerraQuake API.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg border border-purple-600 bg-[#2a0d5b] text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 ${
                isLoading
                  ? "bg-purple-600 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Subscribing...
                </div>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg border ${
                isSuccess
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-800 dark:text-green-200"
                  : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-800 dark:text-red-200"
              }`}
            >
              <div className="flex items-center">
                {isSuccess ? (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {message}
              </div>
            </div>
          )}

          <p className="mt-6 text-sm text-purple-300">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Right Panel (Benefits / Info) */}
        <div className="md:w-1/2 p-10 text-white flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Why Subscribe?</h3>
          <ul className="space-y-3">
            {[
              "Latest news and updates",
              "Exclusive offers and discounts",
              "Product announcements",
              "Weekly digest of best content",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
