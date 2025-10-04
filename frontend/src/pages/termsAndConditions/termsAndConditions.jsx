import { Link } from 'react-router-dom';
import MetaData from '../noPage/metaData';

export default function TermsAndConditions() {
  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Terms and Conditions'
        description='Terms and Conditions - TerraQuake API'
        ogTitle='Terms and Conditions - TerraQuake API'
        twitterTitle='Terms and Conditions - TerraQuake API'
      />
      {/* SEO Stuff */}

      <section className='relative z-30 w-full min-h-screen px-6 py-16 flex justify-center'>
        <div className='max-w-5xl w-full bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-10 space-y-10'>
          {/* Header Section */}
          <div className='flex flex-col justify-center items-center mb-16'>
            <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
              Terms & Conditions
              <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
            </h1>

            {/* Updated */}
            <p className='mt-16 text-white text-center text-lg w-[95%] lg:w-6xl'>
              Last updated: 22-09-2025
            </p>
          </div>

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
          </section>

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
      </section>
    </>
  );
}
