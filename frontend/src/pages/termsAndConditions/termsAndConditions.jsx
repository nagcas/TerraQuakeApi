import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MetaData from "../noPage/metaData";

export default function TermsAndConditions() {
  return (
    <>
      <MetaData
        title="Terms and Conditions - TerraQuake API"
        description="Read the official Terms and Conditions for TerraQuake API usage and data access."
      />

      <section className="relative min-h-screen w-full bg-gradient-to-br from-black via-violet-950 to-purple-900 text-gray-200 px-6 py-20 overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700/20 blur-[100px] rounded-full animate-pulse delay-300" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-5xl mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 md:p-16 space-y-12"
        >
          {/* Header Section */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
            >
              Terms & Conditions
            </motion.h1>
            <p className="mt-3 text-gray-400 italic">Last updated: 22-09-2025</p>
            <div className="mt-4 h-[2px] w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto rounded-full" />
          </div>

          {/* Intro Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="leading-relaxed"
          >
            <p>
              Welcome to <span className="text-pink-400 font-semibold">TerraQuake</span>. 
              By accessing or using our website, APIs, or services, you agree to our Terms and our{" "}
              <Link to="/privacy-policy" className="text-purple-400 underline hover:text-pink-400 transition">
                Privacy Policy
              </Link>. Please review them carefully before proceeding.
            </p>
          </motion.section>

          {/* Terms Sections */}
          {[
            {
              title: "1. General Information",
              content: `TerraQuake provides access to seismic data, resources, and related tools.
              These Terms govern your use of all services, including the website, APIs, and related applications.`,
            },
            {
              title: "2. Account & User Responsibilities",
              list: [
                "Use TerraQuake only for lawful and ethical purposes.",
                "Do not attempt unauthorized access or interfere with functionality.",
                "Provide accurate information when creating an account and keep credentials secure.",
                "Accounts may be suspended or terminated for violations of these Terms.",
                "By creating an account, you consent to the processing of your data per our Privacy Policy.",
              ],
            },
            {
              title: "3. Intellectual Property",
              content:
                "All content, branding, and data on TerraQuake (unless otherwise stated) belong to TerraQuake or its licensors. Unauthorized copying, redistribution, or commercial use is prohibited.",
            },
            {
              title: "4. Use of Data & APIs",
              list: [
                "Data is provided for research and informational purposes only.",
                "Do not misuse APIs or exceed rate limits.",
                "Commercial use or redistribution requires prior written consent.",
                "Use of data and decisions made are at your own risk.",
              ],
            },
            {
              title: "5. Disclaimers",
              list: [
                "Services are provided 'as is' and 'as available' without warranties.",
                "TerraQuake is not liable for inaccuracies in seismic data.",
              ],
            },
            {
              title: "6. Limitation of Liability",
              content:
                "To the fullest extent permitted by law, TerraQuake and its affiliates are not liable for any indirect or consequential damages resulting from the use or inability to use our services.",
            },
            {
              title: "7. Third-Party Services & Links",
              content:
                "Our platform may include links to third-party websites or services. TerraQuake is not responsible for their content, accuracy, or privacy practices.",
            },
            {
              title: "8. Governing Law",
              content:
                "These Terms are governed by international standards and the laws of Italy/Calabria. Disputes will be resolved under the jurisdiction of courts in Satriano, Italy.",
            },
            {
              title: "9. Force Majeure",
              content:
                "TerraQuake is not liable for service delays caused by events beyond its control, including natural disasters or system failures.",
            },
            {
              title: "10. Modifications",
              content:
                "We may update or modify these Terms at any time. Continued use implies acceptance of the latest version.",
            },
            {
              title: "11. Contact Information",
              content: (
                <>
                  For questions or concerns about these Terms, contact us at{" "}
                  <span className="text-pink-400 font-semibold">terraquakeapi@gmail.com</span>.
                </>
              ),
            },
          ].map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border-t border-white/10 pt-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                {section.title}
              </h2>
              {section.content && <p className="text-gray-300 leading-relaxed">{section.content}</p>}
              {section.list && (
                <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}

          {/* Footer Line */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TerraQuake. All Rights Reserved.
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
