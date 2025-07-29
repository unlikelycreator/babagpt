import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const testimonials = [
  {
    id: 1,
    quote: "Babagpt's predictions are scarily accurate! It's like the stars are spilling all my secrets.",
    name: "Luna Star",
    position: "Aspiring Astrologer"
  },
  {
    id: 2,
    quote: "The wittiest horoscopes I've ever read. Babagpt makes my cosmic journey a blast!",
    name: "Cosmo Ray",
    position: "Freelance Dreamer"
  },
  {
    id: 3,
    quote: "Every prediction feels like a personal cosmic DM. Babagpt gets me!",
    name: "Stella Moon",
    position: "Zodiac Enthusiast"
  },
  {
    id: 4,
    quote: "Babagpt's insights turned my day around. It's like having a starry best friend!",
    name: "Astra Nova",
    position: "Creative Visionary"
  },
  {
    id: 5,
    quote: "The sass and accuracy of these horoscopes? Out of this world!",
    name: "Orion Spark",
    position: "Cosmic Explorer"
  }
];

const Testimonials = forwardRef((props, ref) => {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    },
  };

  return (
    <section ref={ref} className="min-h-[85vh] w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-indigo-900 dark:text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          What the Stars Say About Us
        </motion.h2>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <motion.div
                  className="p-4"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
                    <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-200 mb-4 text-center">
                        "{testimonial.quote}"
                      </p>
                      <h4 className="text-md sm:text-lg font-semibold text-orange-600 dark:text-orange-400 mb-2">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.position}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-orange-600 text-white hover:text-white rounded-full shadow-md hover:bg-indigo-700" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-orange-600 text-white hover:text-white rounded-full shadow-md hover:bg-indigo-700" />
        </Carousel>
      </div>
    </section>
  );
});

export default Testimonials;