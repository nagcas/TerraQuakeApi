import { Context } from "@/components/modules/context";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../noPage/metaData";
import { motion } from "framer-motion";

export default function EditProfile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title="Edit Profile"
        description="Edit your TerraQuake API profile details, including personal information and preferences."
        ogTitle="Edit Profile - TerraQuake API"
        ogDescription="Update and customize your TerraQuake API profile to keep your information accurate and up-to-date."
        twitterTitle="Edit Profile - TerraQuake API"
        twitterDescription="Manage and update your TerraQuake API profile with ease."
        keywords="TerraQuake API, edit profile, update account, user settings"
      />
      {/* SEO Stuff */}
      <motion.section
        className="relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-left py-4">
          {isLoggedIn ? (
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
              {/* Header Section */}
              <motion.div
                className="mb-16 text-center lg:text-left"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h1 className="text-3xl md:text-5xl text-white font-extrabold tracking-tighter mb-4">
                  Edit your Profile
                  <div className="h-0.5 w-1/5 md:w-1/10 mx-auto md:mx-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full" />
                </h1>
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Form Section */}
                <motion.div
                  className="lg:col-span-2 p-8 md:p-12 border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <form onSubmit="">
                    <div className="mb-8">
                      <label className="block text-white text-sm font-semibold mb-2">
                        Update Username
                      </label>
                      <input
                        className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5
    backdrop-blur-sm border-white/20 focus:border-purple-500
    focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all
    duration-300 placeholder-white/50"
                        name="username"
                        placeholder="Your name"
                        autoComplete="off"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-white text-sm font-semibold mb-2">
                        Update Email
                      </label>
                      <input
                        className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                        name="email"
                        placeholder="name@company.com"
                        autocomplete="off"
                      />
                    </div>
                    <div className="relative mb-6">
                      <label className="block text-white text-sm font-semibold mb-2">
                        Change Password
                      </label>
                      <input
                        className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                        name="password"
                        placeholder="Your password"
                        autocomplete="off"
                      />
                    </div>

                    <div className="relative my-6">
                      <label className="block text-white text-sm font-semibold mb-2">
                        Experience
                      </label>
                      <select
                        className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                        name="experience"
                      >
                        <option
                          value=""
                          disabled
                          selected
                          className="bg-gray-900 text-gray-400"
                        >
                          Select an option
                        </option>
                        <option
                          value="Beginner"
                          className="bg-gray-900 text-gray-400"
                        >
                          Beginner
                        </option>
                        <option
                          value="Intermediate"
                          className="bg-gray-900 text-gray-400"
                        >
                          Intermediate
                        </option>
                        <option
                          value="Expert"
                          className="bg-gray-900 text-gray-400"
                        >
                          Expert
                        </option>
                      </select>
                    </div>
                    <div className="relative my-6">
                      <label className="block text-white text-sm font-semibold mb-2">
                        Experience
                      </label>
                      <select
                        className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                        name="experience"
                      >
                        <option
                          value=""
                          disabled
                          selected
                          className="bg-gray-900 text-gray-400"
                        >
                          Select an option
                        </option>
                        <option
                          value="Beginner"
                          className="bg-gray-900 text-gray-400"
                        >
                          Beginner
                        </option>
                        <option
                          value="Intermediate"
                          className="bg-gray-900 text-gray-400"
                        >
                          Intermediate
                        </option>
                        <option
                          value="Expert"
                          className="bg-gray-900 text-gray-400"
                        >
                          Expert
                        </option>
                      </select>
                    </div>
                    <button
                      className="
                    mt-8
                    w-full
                    bg-gradient-to-r from-purple-600 to-pink-500 
                  text-white font-semibold 
                    py-4 px-6 rounded-full
                    hover:scale-[1.01] hover:shadow-xl
                    active:scale-[0.99]
                    transform transition-all duration-300 ease-in-out
                    flex items-center justify-center gap-2
                    cursor-pointer
                  "
                      type="submit"
                      aria-label="Save Changes"
                    >
                      Save Changes
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl text-center text-gray-300 max-w-lg">
                To edit your profile page, you need to be registered. If you
                already have an account, please sign in. Otherwise, create a new
                account to get started.
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate("/signin")}
                  className="py-3 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Navigate to sign in page"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="py-3 px-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Navigate to sign up page"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          ;
        </div>
      </motion.section>
    </>
  );
}
