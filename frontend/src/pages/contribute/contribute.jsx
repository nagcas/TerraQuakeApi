import { motion } from "framer-motion";
import { useState } from "react";
import { FaCode, FaBug, FaBook } from "react-icons/fa";
import BackToTopButton from "@/components/utils/backToTopButton";
import MetaData from "@pages/noPage/metaData";
import { FaDiscord } from "react-icons/fa";
import { IoIosGitPullRequest } from "react-icons/io";
import { API_DOCS, CODE_OF_CONDUCT, DISCORD_LINK, ISSUE_TRACKER, PULL_REQUESTS } from "@/data/CONTRIBUTE";
import HF_SVG from "@/data/HACKTOBERFEST_SVG.jsx";
import hacktoberfest from "@images/hacktoberfest.svg"


const ContributionCard = ({ icon, title, description, link, linkText }) => {
  const [transformStyle, setTransformStyle] = useState(
    "rotateX(0deg) rotateY(0deg) scale(1)"
  );

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    const rotateX = -y * 15;
    const rotateY = x * 15;
    setTransformStyle(
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="w-full"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl h-full flex flex-col"
        style={{
          transform: transformStyle,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="mb-4 text-3xl bg-gradient-to-r from-pink-500 to-purple-500 text-white bg-clip-text w-fit">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-100">{title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-semibold group"
        >
          {linkText}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {" "}
            &rarr;
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default function Contribute() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const title = "Build the Future of Seismic Tech";
  const titleWords = title.split(" ");

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <MetaData
        title="Contribute | TerraQuake API - Open Source Earthquake Monitoring"
        description="Join the TerraQuake API community to contribute code, seismic data, or documentation and help advance earthquake monitoring technology."
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <section className="relative z-10 w-full min-h-screen px-6 py-24 sm:py-32 overflow-hidden text-white">
        <motion.div
          className="text-center max-w-4xl text-white mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.div
            className="h-1 w-48 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            style={{ originX: 0 }}
          />
          <motion.p
            className="mt-6 text-lg text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            TerraQuake is built by a global community. Whether you're a
            developer, a seismologist, or a data enthusiast, your contribution
            is vital. Let's make seismic data more accessible together.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
        >
          <ContributionCard
            icon={<FaCode />}
            title="Contribute Code"
            description="Help us develop the Node.js API and the React frontend. Check the issues list for ways to jump in."
            link={PULL_REQUESTS}
            linkText="Submit a Pull Request"
          />
          <ContributionCard
            icon={<FaBug />}
            title="Report Bugs"
            description="Found a broken endpoint or a data glitch? Filing a detailed report is one of the most valuable contributions you can make."
            link={ISSUE_TRACKER}
            linkText="View Open Issues"
          />
          <ContributionCard
            icon={<FaBook />}
            title="Improve Documentation"
            description="Clear guides are essential for a great developer experience. If you spot a typo or can explain something better, we welcome your input."
            link={`${API_DOCS}`}
            linkText="Update the Docs"
          />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          id="community"
          className="mt-24 text-center backdrop-blur-sm border border-white/10 p-10 rounded-xl max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-400">
            Our Discord server is the central hub for collaboration. Introduce
            yourself, ask questions, and chat directly with the core team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg flex justify-center items-center gap-3 group"
            >
              <FaDiscord className="text-2xl icon-bounces" />
              Join our Discord
            </a>
            <a
              href={CODE_OF_CONDUCT}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-400 hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer"
            >
              Read Code of Conduct
            </a>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="mt-20 max-w-3xl mx-auto p-6 bg-gradient-to-r from-slate-900 to-slate-800/70 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg cursor-pointer"
        >
          <a
            href="https://hacktoberfest.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-decoration-none"
          >
            <div className="flex items-center gap-5">
          
            
              <img className="pt-3 w-48 h-25" src={hacktoberfest}/>


              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white">
                  Join us for Hacktoberfest 2025!
                </h3>
                <p className="text-gray-400 mt-1">
                  Help us improve TerraQuake and get your limited edition swag.
                </p>
              </div>
            </div>
            <a href={ISSUE_TRACKER} className="mt-4 sm:mt-0 whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition-all duration-300 transform group">
              <div className="flex gap-2 justify-center items-center">
                <IoIosGitPullRequest size={25} className="transition-transform duration-500 origin-top dangle-on-hover text-2xl" />
                <span>Find an Issue</span>
              </div>
            </a>
          </a>
        </motion.div>
      </section>
      <BackToTopButton />
    </>
  );
}
