import React from 'react';
import { motion } from 'framer-motion';
import bgStar from '../../assets/star-bg.jpg'; // Cosmic background
import zodiacWheel from '../../assets/zodiac-wheel.svg'; // Spinning zodiac image
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate();
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 }
        },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    };

    // Animation for spinning zodiac wheel
    const wheelVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 20, // Slow spin
                ease: 'linear',
            },
        },
    };

    const navigateToFortune = () => {
        navigate('/fortune');
    };

    return (
        <section className="relative min-h-[85vh] w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
            <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                {/* Content aligned to the left */}
                <div className="flex flex-col items-start text-left w-full md:w-1/2 px-4 sm:px-6">
                    {/* Main heading with adjusted line height */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 dark:text-white mb-3 sm:mb-4 leading-loose tracking-tight"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Unlock Your Cosmic Path with <span className="text-orange-600 dark:text-orange-600 px-3 py-1 rounded-full">Babagpt</span>
                    </motion.h1>

                    {/* Subheading with wider max-width */}
                    <motion.p
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-200 mb-4 sm:mb-6 max-w-full"
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    >
                        Curious about what the cosmos are whispering? Babagpt decodes the stars with five mystical parameters, delivering horoscopes so sharp they'll have you starry-eyed. Expect witty predictions with a dash of celestial swagger—your future's about to get a cosmic glow-up!
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        className="bg-indigo-600 text-white px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full hover:bg-indigo-700 transition-colors shadow-md"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        onClick={navigateToFortune}
                    >
                        Peek Into Your Cosmic Future
                    </motion.button>
                </div>

                {/* Larger spinning zodiac wheel on the right */}
                <motion.img
                    src={zodiacWheel}
                    alt="Zodiac Wheel"
                    className="w-full md:w-[80%] lg:w-[70%] max-w-3xl object-contain mt-6 md:mt-0"
                    variants={wheelVariants}
                    animate="animate"
                />


            </div>
        </section>
    );
};

export default Hero;