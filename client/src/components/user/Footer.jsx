import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-6 md:px-16 text-center">
        {/* Title and Motto */}
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
          Ayush Raina - Web Developer
        </h2>
        <p className="mb-6 text-gray-400">
          Passionate about building impactful projects and sharing personal experiences through code.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="Email"
          >
            <FaEnvelope size={24} />
          </a>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-4" />

        {/* Footer Bottom */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ayush Raina. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
