import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const socials = [
    { title: "X / Twitter", url: "https://x.com/nagcas/", icon: <FaXTwitter className="text-2xl" /> },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/gianluca-chiaravalloti-5694081a2/", icon: <FaLinkedin className="text-2xl" /> },
    { title: "GitHub", url: "https://github.com/nagcas/", icon: <FaGithub className="text-2xl" /> },
    { title: "Discord", url: "https://discord.gg/RDBp8KJB", icon: <FaDiscord className="text-2xl" /> },
    { title: "YouTube", url: "https://www.youtube.com/@TerraQuakeAPI", icon: <FaYoutube className="text-2xl" /> },
  ];

  const navLinks = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Docs", url: "/docs" },
    { title: "Contribute", url: "/contribute" },
  ];

  const resourceLinks = [
    { title: "GitHub", url: "https://github.com/nagcas/TerraQuakeApi" },
    { title: "FAQ", url: "/faq" },
    { title: "Contact", url: "/contact" },
    { title: "Privacy Policy", url: "/privacy-policy" },
  ];

  return (
    <footer className="bg-gradient-to-b from-violet-950 to-black text-slate-300 py-10 text-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">TerraQuake API</h2>
          <p className="text-sm leading-relaxed">
            Open-source project providing reliable earthquake data for developers, researchers, and communities.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-center">Navigation</h3>
          <ul className="space-y-2 text-sm text-center">
            {navLinks.map(link => (
              <li key={link.title}>
                <a href={link.url} className="hover:text-violet-400 transition">{link.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-center">Resources</h3>
          <ul className="space-y-2 text-sm text-center">
            {resourceLinks.map(link => (
              <li key={link.title}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition">{link.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-center">Community & Socials</h3>
          <div className="flex justify-center space-x-4">
            {socials.map(item => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit TerraQuake API ${item.title} profile`}
                className="hover:text-violet-400 transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mt-10 pt-6 px-6 text-center text-sm text-slate-400 space-y-4">
        <p>&copy; {new Date().getFullYear()} TerraQuake API · All rights reserved</p>
        <p className="max-w-3xl mx-auto leading-relaxed px-4">
          TerraQuake API is free software: you can redistribute it and/or modify it under the terms of the{' '}
          <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition">
            GNU Affero General Public License
          </a>, either version 3 of the License, or (at your option) any later version.
        </p>
      </div>
    </footer>
  );
}
