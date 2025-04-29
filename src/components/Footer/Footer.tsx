'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 md:py-16 overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url('/projects/bg1.webp')` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6"
          >
            <h3 className="text-white text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/lokkeestudios"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/lokkeestudios"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com/lokkeestudios"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6"
          >
            <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/70 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6"
          >
            <h3 className="text-white text-xl font-semibold mb-4">Contact Info</h3>
            <p className="text-white/70 mb-2">Email: contact@lokkeestudios.com</p>
            <p className="text-white/70 mb-2">Phone: +1 (555) 123-4567</p>
            <p className="text-white/70">Location: New York, USA</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center text-white/50 text-sm"
        >
          <p>© {currentYear} LOKKEE STUDIOS. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 