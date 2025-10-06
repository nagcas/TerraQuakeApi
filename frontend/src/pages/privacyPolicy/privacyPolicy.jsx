import MetaData from "../noPage/metaData";

export default function PrivacyPolicy() {
  return (
    <>
      <MetaData
        title="Privacy Policy"
        description="Privacy Policy Page of TerraQuake"
      />
      <section className="relative z-30 w-full min-h-screen px-6 py-16 flex justify-center bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-900">
        <div className="max-w-5xl w-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-10 space-y-10 transition-all hover:shadow-purple-900/40">

          {/* Titolo */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 font-extrabold text-center my-10 tracking-tight drop-shadow-lg">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400 italic">
              Last updated: 22-09-2025
            </p>
          </div>

          {/* Sezioni */}
          <section className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              TerraQuake ("we", "our", "us") respects your privacy. This Privacy
              Policy explains how we collect, use, and protect your data in
              compliance with GDPR, CCPA, and other applicable regulations.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 1. Data We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Personal data: name, email, account information.</li>
              <li>
                Usage data: IP address, browser type, pages visited, API usage.
              </li>
              <li>
                Cookies and similar technologies for analytics and preferences.
              </li>
            </ul>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 2. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Provide and maintain our services.</li>
              <li>Improve website and API functionality.</li>
              <li>Send updates or communications if consented.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 3. Legal Basis (GDPR)
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We process your data based on your consent, contractual necessity,
              or legal obligations.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 4. Sharing Your Data
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Data may be shared with service providers, hosting platforms, and
              API partners, strictly for purposes outlined in this Policy. We do
              not sell your personal information.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 5. User Rights (GDPR & CCPA)
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Access, rectify, or delete your data.</li>
              <li>Withdraw consent at any time.</li>
              <li>Request data portability.</li>
              <li>Opt-out of sale of personal information (CCPA only).</li>
              <li>Object or restrict processing where applicable.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              To exercise these rights, contact us at{" "}
              <span className="text-pink-400 font-semibold hover:underline decoration-pink-500/50">
                terraquakeapi@gmail.com
              </span>
              .
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 6. Data Retention
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We retain personal data only as long as necessary to provide
              services or comply with legal obligations.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 7. Cookies & Tracking
            </h2>
            <p className="text-gray-300 leading-relaxed">
              TerraQuake uses cookies and similar technologies for analytics and
              user experience. You may manage cookie preferences through your
              browser settings.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 8. International Transfers
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Your data may be processed or stored outside your country. We take
              measures to ensure adequate protection in line with GDPR
              requirements.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 9. Security
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We implement reasonable technical and organizational measures to
              protect your data against unauthorized access or disclosure.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 10. Changes to this Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy periodically. Continued use of
              our services constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-6 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 11. Contact Information
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Questions or requests regarding privacy? Contact us at{" "}
              <span className="text-pink-400 font-semibold hover:underline decoration-pink-500/50">
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
