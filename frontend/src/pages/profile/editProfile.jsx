import { Context } from "@/components/modules/context";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../noPage/metaData";
import { motion } from "framer-motion";

export default function EditProfile() {
  const { userLogin, isLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      {/* SEO Metadata */}
      <MetaData
        title="Edit Profile"
        description="Edit your TerraQuake API profile details, including personal information and preferences."
        ogTitle="Edit Profile - TerraQuake API"
        ogDescription="Update and customize your TerraQuake API profile to keep your information accurate and up-to-date."
        twitterTitle="Edit Profile - TerraQuake API"
        twitterDescription="Manage and update your TerraQuake API profile with ease."
        keywords="TerraQuake API, edit profile, update account, user settings"
      />

      <motion.section
        className="col-span-1 lg:col-span-2 bg-black/30 backdrop-blur-xl border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {isLoggedIn ? (
          <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Edit your Profile
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 rounded-full" />
            </motion.div>

            {/* Form Section */}
            <motion.div
              className="p-6 sm:p-10 lg:p-14 border border-white/10 bg-white/[0.03] rounded-3xl shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form className="space-y-8">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Update Name
                  </label>
                  <input
                    className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                    name="name"
                    placeholder="Your name"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Update Email
                  </label>
                  <input
                    className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                    name="email"
                    placeholder="name@company.com"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Experience
                  </label>
                  <select
                    defaultValue=""
                    className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                    name="experience"
                  >
                    <option value="" disabled className="bg-gray-900 text-gray-400">
                      Select an option
                    </option>
                    <option value="Beginner" className="bg-gray-900 text-gray-400">
                      Beginner
                    </option>
                    <option value="Intermediate" className="bg-gray-900 text-gray-400">
                      Intermediate
                    </option>
                    <option value="Expert" className="bg-gray-900 text-gray-400">
                      Expert
                    </option>
                  </select>
                </div>

                 <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Student
                  </label>
                  <select
                    defaultValue=""
                    className="w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50"
                    name="student"
                  >
                    <option value="" disabled className="bg-gray-900 text-gray-400">
                      Select an option
                    </option>
                    <option value="yes" className="bg-gray-900 text-gray-400">
                      yes
                    </option>
                    <option value="no" className="bg-gray-900 text-gray-400">
                      no
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  aria-label="Save Changes"
                  className="w-full mt-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-transform duration-300 ease-in-out cursor-pointer"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
            <p className="text-lg md:text-xl text-gray-300">
              To edit your profile page, you need to be registered. If you already have an account, please sign in. Otherwise, create a new account to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
      </motion.section>
    </>
  );
}
