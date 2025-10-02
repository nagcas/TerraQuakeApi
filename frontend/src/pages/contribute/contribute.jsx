import React from "react";
import MetaData from "../noPage/metaData";

export default function Contribute() {
  const GITHUB_REPO = "https://github.com/nagcas/TerraQuakeApi";
  const ISSUE_TRACKER = `${GITHUB_REPO}/issues`;
  const PULL_REQUESTS = `${GITHUB_REPO}/pulls`;
  const DISCORD_LINK = "https://discord.com/invite/RDBp8KJB";
  const CODE_OF_CONDUCT = `${GITHUB_REPO}/blob/main/CONTRIBUTING.md`;

  const ContributionCard = ({ icon, title, description, link, linkText }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl hover:bg-gray-700 transition duration-300">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-yellow-500">{title}</h3>
      <p className="mb-4 opacity-80">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-400 hover:text-blue-300 transition duration-150 font-semibold underline"
      >
        {linkText} &rarr;
      </a>
    </div>
  );

  return (
    <>
      <MetaData
        title="Contribute"
        description="Help improve the TerraQuake API by contributing code, data, or documentation."
      />

      <section className="relative z-30 w-full min-h-screen px-6 py-20 text-white">
        <div className="flex flex-col justify-center items-center mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 tracking-tight">
            Join the TerraQuake Team!
          </h1>
          <p className="text-lg max-w-3xl text-center opacity-80">
            TerraQuake is built by its community. Whether you're a developer,
            geologist, or just a power user, your help makes a difference.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12 text-left">
          <div className="grid md:grid-cols-3 gap-8">
            <ContributionCard
              icon="👨‍💻"
              title="Code & Build Features"
              description="Help us develop the Node.js API and the React frontend. Check the issues list for ways to jump in."
              link={PULL_REQUESTS}
              linkText="Submit a Pull Request"
            />
            <ContributionCard
              icon="🚨"
              title="Report Bugs & Issues"
              description="Found a broken endpoint or a data glitch? Filing a detailed report is one of the most valuable contributions."
              link={ISSUE_TRACKER}
              linkText="View Open Issues"
            />
            <ContributionCard
              icon="✍️"
              title="Improve Documentation"
              description="Clear guides are essential. If you spot a typo or know how to explain something better, please contribute!"
              link={`${GITHUB_REPO}/tree/main/docs`}
              linkText="Contribute to the Docs"
            />
          </div>

          <section
            id="community"
            className="pt-8 text-center bg-gray-900 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Let's Connect!</h2>
            <p className="max-w-3xl mx-auto mb-6 opacity-90">
              We do all our coordination on Discord. Introduce yourself, ask
              questions, and chat directly with the project lead, Dr. Gianluca
              Chiaravalloti.
            </p>
            
            <a
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 mb-4 md:mr-4"
            >
              Join the TerraQuake Discord Community 💬
            </a>
            
            <a
              href={CODE_OF_CONDUCT}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-gray-400 hover:text-gray-200 border border-gray-600 hover:border-gray-400 py-3 px-8 rounded-full transition duration-300"
            >
              Read Code of Conduct
            </a>
          </section>

          <p className="text-center pt-4 opacity-70">
            We are participating in **Hacktoberfest 2025**. Look for
            contributing guidelines in the repository to get started!
          </p>
        </div>
      </section>
    </>
  );
}