import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import contactZodiac from '../../assets/contact-zodiac.png'; // Zodiac-themed contact image

const Contact = forwardRef((props, ref) => {
  // Animation variants for form and image
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 }
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  // Function to handle form submission via email client
  const handleSubmit = () => {
    const name = document.getElementById('name').value || 'Cosmic Traveler';
    const email = document.getElementById('email').value || '';
    const message = document.getElementById('message').value || 'I want to know my cosmic fate!';
    const subject = encodeURIComponent('Cosmic Query from Babagpt');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    window.location.href = `mailto:hritikpawar.personal@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={ref} className="min-h-[85vh] w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {/* Contact Form */}
        <motion.div
          className="w-full md:w-1/2 px-4 sm:px-6"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 dark:text-white mb-4">
            Send a Cosmic Signal
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-200 mb-4 max-w-lg">
            Got a starry question or celestial feedback? Drop us a message, and we'll channel the universe to get back to you with cosmic clarity!
          </p>
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Cosmic Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Stellar Traveler"
                className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Galactic Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@cosmos.com"
                className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Cosmic Query
              </label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 w-full p-3 border rounded-md bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                placeholder="What's written in the stars for me?"
              />
            </div>

            {/* Submit Button */}
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Launch Your Message
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Image */}
        <motion.div
          className="w-full md:w-[65%] flex justify-center md:justify-end"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={contactZodiac}
            alt="Zodiac Contact"
            className="w-full max-w-3xl object-contain"
          />
        </motion.div>

      </div>
    </section>
  );
});

export default Contact;