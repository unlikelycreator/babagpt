import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Expertise = forwardRef((props, ref) => {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <section ref={ref} className="w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 min-h-[50vh] py-8 sm:py-12">
        {/* Section Header */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-indigo-900 dark:text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Our Cosmic Craft
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-center text-gray-600 dark:text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          At Babagpt, we weave your horoscope with five mystical parameters, blending celestial magic with a pinch of wit to predict your cosmic journey.
        </motion.p>

        {/* Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Parameter 1 */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 sm:p-6 shadow-md backdrop-blur-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 text-center">
              Star Alignment
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">
              We analyze the positions of the stars to uncover the cosmic vibes shaping your destiny.
            </p>
          </motion.div>

          {/* Parameter 2 */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 sm:p-6 shadow-md backdrop-blur-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 text-center">
              Planetary Influence
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">
              The planets’ dance guides our predictions, revealing opportunities and challenges ahead.
            </p>
          </motion.div>

          {/* Parameter 3 */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 sm:p-6 shadow-md backdrop-blur-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 text-center">
              Elemental Balance
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">
              Fire, Water, Air, Earth—we balance the elements to craft your unique cosmic blueprint.
            </p>
          </motion.div>

          {/* Parameter 4 */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 sm:p-6 shadow-md backdrop-blur-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 text-center">
              Lunar Cycles
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">
              The moon’s phases add depth to our forecasts, illuminating your emotional tides.
            </p>
          </motion.div>

          {/* Parameter 5 */}
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 sm:p-6 shadow-md backdrop-blur-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 text-center">
              Cosmic Intuition
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">
              A touch of celestial sass ties it all together, making your horoscope uniquely yours.
            </p>
          </motion.div>
        </div>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-center text-gray-600 dark:text-gray-200 mt-6 sm:mt-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          Our five-parameter approach ensures your horoscope is as precise as a comet’s path and as fun as a starry night.
        </motion.p>
      </div>
    </section>
  );
});

export default Expertise;