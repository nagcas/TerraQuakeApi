import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MetaData from "../noPage/metaData";
import { Link } from 'react-router-dom';
import MetaData from '../noPage/metaData';
import BackToTopButton from '@/components/utils/backToTopButton';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
  return (
    <>
      {/* SEO Stuff */}
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
        title='Terms and Conditions - TerraQuake API'
        description='Read the Terms and Conditions for using the TerraQuake API, including guidelines, usage rules, and legal information.'
        ogTitle='Terms and Conditions - TerraQuake API'
        ogDescription='Understand the rules, guidelines, and legal terms for using the TerraQuake API.'
        twitterTitle='Terms and Conditions - TerraQuake API'
        twitterDescription='Official Terms and Conditions for the TerraQuake API, including user obligations and legal information.'
        keywords='TerraQuake API terms, API usage policy, legal terms, API guidelines'
      />
      {/* SEO Stuff */}

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        {/* Content Container */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white/70'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Terms & Conditions.
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              Last updated: 22-09-2025.
            </p>
          </motion.div>

          <section className='space-y-6'>
            <p className='text-gray-300 leading-relaxed'>
              Welcome to <strong>TerraQuake</strong>. By accessing or using our
              website, services, or APIs, you agree to comply with these Terms
              and our{' '}
              <Link
                to='/privacy-policy'
                className='text-pink-400 underline'
              >
                Privacy Policy
              </Link>
              . Please read them carefully.
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              1. General Information
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              TerraQuake provides access to seismic data, resources, and related
              tools. These Terms govern your use of our services, including the
              website, APIs, and related applications.
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              2. Account & User Responsibilities
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>Use TerraQuake only for lawful and ethical purposes.</li>
              <li>
                Do not misuse services, attempt unauthorized access, or
                interfere with functionality.
              </li>
              <li>
                Provide accurate information when creating an account and
                maintain confidentiality of login credentials.
              </li>
              <li>
                Accounts may be suspended or terminated for violations of these
                Terms or Privacy Policy.
              </li>
              <li>
                By creating an account, you consent to the collection and
                processing of your personal data in accordance with our Privacy
                Policy.
              </li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              3. Intellectual Property
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              All content, branding, code, and data on TerraQuake (unless
              otherwise stated) are owned by TerraQuake or licensed to us. You
              may not copy, distribute, or commercially exploit our content
              without prior written consent.
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              4. Use of Data & APIs
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>
                Data provided by TerraQuake is for informational and research
                purposes only.
              </li>
              <li>Do not misuse APIs or exceed rate limits.</li>
              <li>
                Redistribution or commercial use of data requires prior written
                consent.
              </li>
              <li>
                Decisions made based on provided information are at your own
                risk.
              </li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              5. Disclaimers
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>
                Services are provided “as is” and “as available” without
                warranties.
              </li>
              <li>
                TerraQuake is not liable for the accuracy or completeness of
                seismic data.
              </li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              6. Limitation of Liability
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              To the maximum extent permitted by law, TerraQuake and affiliates
              are not liable for indirect, incidental, or consequential damages
              from using or being unable to use our services.
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              7. Third-Party Services & Links
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              TerraQuake may include links to third-party websites or services.
              We are not responsible for their content, accuracy, or privacy
              practices.
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              8. Governing Law
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              These Terms are governed by international standards and the laws
              of Italy/Calabria. Disputes shall be subject to the jurisdiction
              of competent courts in Satriano, Italy.
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
          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              9. Force Majeure
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              TerraQuake is not liable for delays or failures caused by events
              beyond reasonable control, including natural disasters, power
              outages, or technical failures.
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              10. Modifications
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              TerraQuake may update or modify these Terms at any time. Continued
              use implies acceptance.
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              11. Contact Information
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              Questions about these Terms? Contact us at{' '}
              <span className='text-pink-400 font-semibold'>
                terraquakeapi@gmail.com
              </span>
              .
            </p>
          </section>
        </div>
        {/* Floating Back-to-Top Button Component */}
        <BackToTopButton />
      </motion.section>
    </>
  );
}
