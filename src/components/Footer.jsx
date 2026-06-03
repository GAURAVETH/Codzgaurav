import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/codezgaurav/",
    icon: <FaLinkedin className="text-xl" />
  },
  {
    name: "GitHub",
    href: "https://github.com/GAURAVETH/",
    icon: <FaGithub className="text-xl" />
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-8 text-zinc-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-10 max-w-7xl">

        {/* Copyright */}
        <p className="text-center text-sm md:text-left">
          © {new Date().getFullYear()} CodezGaurav. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-5 md:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name} // Crucial for accessibility
              className="flex size-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)]"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Links */}
        <a
          href="#privacy-policy"
          className="text-center text-sm transition-colors hover:text-emerald-400 hover:underline md:text-right"
        >
          Privacy Policy
        </a>

      </div>
    </footer>
  );
};

export default Footer;