import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { marked } from 'marked';
import { X, AlertTriangle } from 'lucide-react';
import Logo from '../../assets/babagpt-logo-bgremove.png';
import { useNavigate } from 'react-router-dom';
const Fortune = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        dateOfBirth: '',
        placeOfBirth: '',
        timeOfBirth: '',
        outputLanguage: 'English',
    });
    const [horoscope, setHoroscope] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    };

    const resultVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    // Handle select change for gender, time, and language
    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    // Get reading count from localStorage
    const getReadingCount = () => {
        return parseInt(localStorage.getItem('fortuneReadingCount') || '0', 10);
    };

    // Increment reading count in localStorage
    const incrementReadingCount = () => {
        const currentCount = getReadingCount();
        localStorage.setItem('fortuneReadingCount', (currentCount + 1).toString());
    };

    // Generate question phrase and call Gemini API
    const handleSubmit = async () => {
        // Check reading count before submission
        const readingCount = getReadingCount();
        if (readingCount >= 3) {
            setIsLimitModalOpen(true);
            return;
        }

        if (!formData.fullName || !formData.gender || !formData.dateOfBirth || !formData.placeOfBirth || !formData.timeOfBirth || !formData.outputLanguage) {
            setError('Please fill in all fields to get your horoscope.');
            return;
        }

        setIsLoading(true);
        setError('');
        setHoroscope('');

        // Construct question phrase with markdown formatting instructions
        const question = `
            I want to know about the following for ${formData.fullName}, a ${formData.gender} born on ${formData.dateOfBirth} at ${formData.timeOfBirth} in ${formData.placeOfBirth}: love life, marriage prospects, personality traits, success including when they will get their first financial breakthrough, whether they will have a love or arranged marriage, and possible career choices. Provide a detailed, witty, and engaging horoscope based on astrological principles like star alignment, planetary influence, elemental balance, lunar cycles, and cosmic intuition. Respond in ${formData.outputLanguage} using the following markdown format:

            ## ${formData.fullName}'s Horoscope: A Celestial Analysis (translate title to ${formData.outputLanguage})

            **Introduction:**
            - Provide a brief, engaging intro summarizing the input details and setting a cosmic tone.

            **Kundli Summary (translate to ${formData.outputLanguage}):**
            - Summarize the astrological chart based on the input details.

            **Personality Traits (translate to ${formData.outputLanguage}):**
            - List key personality traits in bullet points.

            **Love Life (translate to ${formData.outputLanguage}):**
            - Describe love life prospects in paragraphs and bullet points.

            **Marriage Prospects (translate to ${formData.outputLanguage}):**
            - Discuss marriage possibilities, including love vs. arranged, in paragraphs and bullet points.

            **Success and Financial Breakthrough (translate to ${formData.outputLanguage}):**
            - Detail success prospects and predicted financial breakthrough timing in paragraphs and bullet points.

            **Possible Career Choices (translate to ${formData.outputLanguage}):**
            - List potential career paths in bullet points.

            **Final Thoughts (translate to ${formData.outputLanguage}):**
            - Provide a concluding paragraph with advice and a witty tone.

            **Disclaimer (translate to ${formData.outputLanguage}):**
            - Include a disclaimer about generalized astrological analysis.

            Ensure the response is entirely in ${formData.outputLanguage} without mixing languages.
        `;

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': 'AIzaSyC79LXUaTSo4HR4_fx2qXjH9Bh1UMXfmO0', // Move to .env for production
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: question }
                            ]
                        }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const horoscopeText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'The stars are shy today! Try again later.';
            setHoroscope(horoscopeText);
            // Increment reading count on successful response
            incrementReadingCount();
        } catch (err) {
            setError('Oops! The cosmos are acting up. Please try again later.');
            console.error('Gemini API Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Time options (every 30 minutes)
    const timeOptions = Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? '00' : '30';
        const period = hours < 12 ? 'AM' : 'PM';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${displayHours}:${minutes} ${period}`;
    });

    // Render markdown as HTML
    const renderHoroscope = () => {
        return { __html: marked(horoscope) };
    };

    // Close limit modal
    const closeLimitModal = () => {
        setIsLimitModalOpen(false);
    };

    return (
        <section className="min-h-[94vh] w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div className="mx-auto" variants={formVariants} initial="hidden" animate="visible">
                    <img src={Logo} alt="Babagpt Logo" className="w-60 h-60 mx-auto mb-4" />
                </motion.div>
                <motion.div className="max-w-3xl mx-auto" variants={formVariants} initial="hidden" animate="visible">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-900 dark:text-white mb-4 sm:mb-6">
                        Craft Your Cosmic Horoscope
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-center text-gray-600 dark:text-gray-200 mb-6 sm:mb-8">
                        Enter your details to unlock a personalized horoscope revealing your love life, career, and more, woven from the stars by Babagpt.
                    </p>

                    <div className="space-y-4 bg-white/80 dark:bg-gray-800/80 p-6 sm:p-8 rounded-lg shadow-md backdrop-blur-sm">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Stellar Traveler"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Gender
                            </label>
                            <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                                <SelectTrigger className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500">
                                    <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Date of Birth
                            </label>
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Place of Birth */}
                        <div>
                            <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Place of Birth
                            </label>
                            <Input
                                id="placeOfBirth"
                                name="placeOfBirth"
                                type="text"
                                placeholder="Cosmic City, Galaxy"
                                value={formData.placeOfBirth}
                                onChange={handleInputChange}
                                className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Time of Birth */}
                        <div>
                            <label htmlFor="timeOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Time of Birth
                            </label>
                            <Select onValueChange={(value) => handleSelectChange('timeOfBirth', value)}>
                                <SelectTrigger className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500">
                                    <SelectValue placeholder="Select your time of birth" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeOptions.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Output Language */}
                        <div>
                            <label htmlFor="outputLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Output Language
                            </label>
                            <Select onValueChange={(value) => handleSelectChange('outputLanguage', value)}>
                                <SelectTrigger className="mt-1 w-full bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500">
                                    <SelectValue placeholder="Select output language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Hindi">Hindi</SelectItem>
                                    <SelectItem value="Marathi">Marathi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

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
                                disabled={isLoading}
                            >
                                {isLoading ? 'Reading the Stars...' : 'Get Your Horoscope'}
                            </Button>
                        </motion.div>
                    </div>

                    {/* Horoscope Result */}
                    {horoscope && (
                        <motion.div
                            className="mt-6 p-6 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md backdrop-blur-sm prose dark:prose-invert max-w-none"
                            variants={resultVariants}
                            initial="hidden"
                            animate="visible"
                            dangerouslySetInnerHTML={renderHoroscope()}
                        />
                    )}
                </motion.div>
            </div>

            {/* Limit Reached Modal */}
            <AnimatePresence>
                {isLimitModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLimitModal}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 relative"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeLimitModal}
                                className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>
                            <div className="text-center">
                                <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-2">
                                    Free Tier Limit Reached!
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
                                    You've used all 3 of your free horoscope readings. The stars are begging you to go premium for unlimited cosmic wisdom!
                                </p>

                                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 mb-2" onClick={() => navigate('/')}>
                                    Explore Premium Plans
                                </Button>

                                <Button
                                    onClick={closeLimitModal}
                                    className="w-full bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                                >
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Fortune;