import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import zodiacAbout from '../../assets/zodiac-about.png'; // Zodiac-themed image

const About = forwardRef((props, ref) => {
  // Animation variants for text and image
  const textVariants = {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  return (
    <div>
      {/* About Section */}
      <section ref={ref} className="min-h-[85vh] w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* About Description */}
          <motion.div
            className="w-full md:w-1/2 px-4 sm:px-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 dark:text-white mb-4 leading-tight">
              About <span className="text-orange-600  dark:text-orange-600 px-3 py-1 rounded-full">Babagpt</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-200 mb-4 max-w-lg">
              Welcome to Babagpt, where the stars spill their secrets! We're not your average horoscope app—we're cosmic matchmakers, blending five mystical parameters with a sprinkle of celestial wit to deliver predictions that hit like a meteor shower. Since our launch, we've been guiding starry-eyed dreamers to their cosmic destiny with sass and precision.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-200 max-w-lg">
              Our mission? To make your future sparkle with insights that are equal parts fun and profound. Our vision? To be the universe’s go-to oracle, serving up horoscopes that make you laugh, think, and maybe even check the sky twice. With values rooted in creativity, accuracy, and a touch of cosmic swagger, Babagpt is here to light up your path.
            </p>
          </motion.div>

          {/* About Image */}
          <motion.div
            className="w-full md:w-[60%] flex justify-center md:justify-end"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src={zodiacAbout}
              alt="Zodiac Illustration"
              className="w-full max-w-3xl object-contain"
            />
          </motion.div>

        </div>
      </section>
    </div>
  );
});

export default About;