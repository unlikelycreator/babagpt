import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants for footer content
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    },
  };

  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-4">
      <motion.div
        className="container mx-auto px-4 sm:px-6"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          {/* Copyright and Links */}
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Babagpt. All cosmic rights reserved.
            </p>
            <div className="mt-1 flex justify-center md:justify-start gap-4">
              <a href="/terms" className="text-sm text-indigo-300 hover:text-indigo-100 transition-colors">
                Terms & Conditions
              </a>
              <a href="/privacy" className="text-sm text-indigo-300 hover:text-indigo-100 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Designed and Developed By */}
          <div>
            <p className="text-sm">
              Crafted with ⭐ by{' '}
              <a
                href="https://babagpt.com"
                className="text-indigo-300 hover:text-indigo-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Babagpt Team
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;