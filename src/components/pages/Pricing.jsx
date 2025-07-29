import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Moon, Rocket, Sparkles, CreditCard, Banknote, QrCode, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import QrCodeImage from '../../assets/qr-code.jpeg'; // Placeholder for UPI QR code
const Pricing = forwardRef((props, ref) => {
  // State for payment modal
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.2 },
    }),
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // Animation variants for modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Pricing tiers data
  const tiers = [
    {
      name: 'Free',
      price: 'Free as a shooting star',
      description: 'Dip your toes in the cosmic pool with basic horoscope vibes. Perfect for stargazing newbies!',
      features: [
        'Basic Horoscope Reading (Sun Sign Only)',
        'Limited Fortune Page Access',
        'No AI Model Access (Stars only, no tech!)',
        'Community Support (Ask the universe!)',
      ],
      icon: Star,
      bgColor: 'bg-neutral-200',
      textColor: 'text-gray-600',
      buttonBg: 'bg-neutral-500 hover:bg-indigo-600',
      buttonText: 'text-white',
    },
    {
      name: 'Basic',
      price: '$9.99/month or a cosmic coffee',
      description: 'Step up to the zodiac big leagues with a sprinkle of AI magic. For those who want more than just star signs!',
      features: [
        'Enhanced Horoscope Reading (Sun + Moon Signs)',
        'Grok Model Access (10 queries/day)',
        'Email Support (We’ll reply before Mercury retrogrades)',
        'Fortune Page with Basic Insights',
      ],
      icon: Moon,
      bgColor: 'bg-lime-300',
      textColor: 'text-gray-600',
      buttonBg: 'bg-orange-600 hover:bg-indigo-700',
      buttonText: 'text-white',
    },
    {
      name: 'Pro',
      price: '$29.99/month or a starry dinner',
      description: 'Unleash the full power of the cosmos and AI! For celestial pros who want to chat with the stars and ChatGPT.',
      features: [
        'Full Horoscope Reading (Sun, Moon, Ascendant, Planets)',
        'Grok + ChatGPT 4 Access (50 queries/day)',
        'Priority Email Support (Faster than a comet)',
        'Advanced Fortune Page Insights',
        'Custom Zodiac Alerts',
      ],
      icon: Rocket,
      bgColor: 'bg-blue-500',
      textColor: 'text-gray-300',
      buttonBg: 'bg-rose-500 hover:bg-indigo-800',
      buttonText: 'text-white',
    },
    {
      name: 'Cosmic Elite',
      price: '$99.99/month or a galactic getaway',
      description: 'Ride a supernova to ultimate cosmic wisdom! In-person readings, top-tier AI, and VIP star treatment.',
      features: [
        'Comprehensive Horoscope (Full Natal Chart Analysis)',
        'Grok, ChatGPT 4, ChatGPT 4o Access (Unlimited queries)',
        'In-Person/On-Call Horoscope Consultations (1/month)',
        'Premium Support (24/7 Cosmic Concierge)',
        'Exclusive Cosmic Insights & Predictions',
      ],
      icon: Sparkles,
      bgColor: 'bg-gradient-to-br from-blue-600 to-red-600',
      textColor: 'text-white',
      buttonBg: 'bg-yellow-400 hover:bg-yellow-500',
      buttonText: 'text-black',
    },
  ];

  // Handle button click to open modal
  const openModal = (tier) => {
    if (tier.name === 'Free') {
      toast.success('No payment needed! Enjoy your free cosmic journey!');
      navigate('/fortune');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    setSelectedTier(tier);
    setIsModalOpen(true);
    setPaymentMethod('upi');
    setSuccessMessage('');
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTier(null);
    setPaymentMethod('upi');
    setSuccessMessage('');
  };

  // Simulate payment submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Payment successful for ${selectedTier.name}! You're now a cosmic VIP!`);
      setTimeout(() => closeModal(), 2000);
    }, 1500);
  };

  return (
    <section ref={ref} className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 py-12">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-900 dark:text-white mb-4">
          Pick Your Cosmic Plan
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-8 text-center prose">
          Join BabaGPT on a stellar journey! Choose a plan to unlock horoscopes, AI magic, and cosmic wisdom tailored to your astral ambitions.
        </p>
        {/* Grid of Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <motion.div
                key={tier.name}
                className={`${tier.bgColor} p-6 rounded-lg text-center flex flex-col justify-between h-[600px] shadow-md`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
              >
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-500 mb-2">
                    {tier.price}
                  </p>
                  <p className={`text-sm ${tier.textColor} mb-4`}>
                    {tier.description}
                  </p>
                  <IconComponent
                    className={`h-16 w-16 mx-auto mb-4 ${tier.textColor}`}
                    strokeWidth={1.5}
                  />
                  <ul className={`text-sm ${tier.textColor} text-left space-y-2`}>
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">✨</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => openModal(tier)}
                  className={`${tier.buttonBg} ${tier.buttonText} w-full py-2 mt-4 rounded-md font-semibold text-sm transition-colors`}
                >
                  {tier.name === 'Free' ? 'Start Stargazing' : 'Join the Cosmos'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTier && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full mx-4 relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-indigo-900 dark:text-white mb-4 text-center">
                Pay for {selectedTier.name} - Faster than a Shooting Star!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-200 mb-6 text-center">
                Secure your cosmic plan for {selectedTier.price}. Choose your payment method below!
              </p>

              {successMessage ? (
                <p className="text-green-500 text-center font-semibold">{successMessage}</p>
              ) : (
                <>
                  {/* Payment Method Tabs */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <button
                      className={`px-4 py-2 rounded-md ${paymentMethod === 'upi' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <QrCode size={20} className="inline mr-2" /> UPI
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${paymentMethod === 'card' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard size={20} className="inline mr-2" /> Card
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${paymentMethod === 'banking' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      onClick={() => setPaymentMethod('banking')}
                    >
                      <Banknote size={20} className="inline mr-2" /> Net Banking
                    </button>
                  </div>

                  {/* Payment Form */}
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <img
                            src={QrCodeImage}
                            alt="UPI QR Code"
                            className="h-32 w-32 mx-auto mb-4"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Scan this cosmic QR code with your UPI app!
                          </p>
                        </div>
                        <div>
                          <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Or Enter UPI ID
                          </label>
                          <input
                            id="upiId"
                            type="text"
                            placeholder="yourname@upi"
                            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Card Number
                          </label>
                          <input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                          />
                        </div>
                        <div className="flex space-x-4">
                          <div className="w-1/2">
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Expiry
                            </label>
                            <input
                              id="expiry"
                              type="text"
                              placeholder="MM/YY"
                              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              CVV
                            </label>
                            <input
                              id="cvv"
                              type="text"
                              placeholder="123"
                              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="cardholder" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Cardholder Name
                          </label>
                          <input
                            id="cardholder"
                            type="text"
                            placeholder="Stellar Traveler"
                            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'banking' && (
                      <div className="space-y-4">
                        <label htmlFor="bank" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Select Bank
                        </label>
                        <select
                          id="bank"
                          className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-800/80 focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        >
                          <option value="">Select your bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Zooming to the Stars...' : 'Pay Now'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default Pricing;