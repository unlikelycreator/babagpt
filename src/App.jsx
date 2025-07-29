import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ArrowUpCircle, Volume2, VolumeX } from 'lucide-react';
import Header from "./components/pages/Header";
import Hero from "./components/pages/Hero";
import About from "./components/pages/About";
import Testimonials from "./components/pages/Testimonial";
import Contact from "./components/pages/Contact";
import Footer from "./components/pages/Footer";
import Fortune from "./components/pages/Fortune";
import Pricing from "./components/pages/Pricing";
import Expertise from "./components/pages/expertise";
import MusicFile from './assets/background-music.mp3'; // Path to your audio file

function AppContent() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const expertiseRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);
  const audioRef = useRef(null); // Reference to the audio element
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track audio playback state
  const [showPopup, setShowPopup] = useState(true); // Control welcome popup visibility
  const location = useLocation();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll for showing/hiding scroll-to-top button
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Toggle audio playback
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  // Handle popup enter button click
  const handleEnter = () => {
    setShowPopup(false);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Audio Element */}
      <audio ref={audioRef} src={MusicFile} loop muted={!isPlaying} />

      {/* Welcome Popup */}
      {/* Welcome Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border-2 border-indigo-500">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">🔮 Welcome to BabaGPT!</h2>
            <p className="text-gray-700 mb-4 italic">
              Where the stars align… and so does your destiny.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Click "Enter" to unveil what the cosmos has in store for you. Astrological wisdom,
              playful insights, and mysterious vibes await!
            </p>
            <button
              onClick={handleEnter}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md"
            >
              ✨ Enter My Fortune ✨
            </button>
          </div>
        </div>
      )}


      {/* Header */}
      <Header homeRef={homeRef} aboutRef={aboutRef} />

      {/* Main Content */}
      <div className="flex-grow w-full">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div ref={homeRef}>
                  <Hero />
                </div>
                <About ref={aboutRef} />
                <Expertise ref={expertiseRef} />
                <Pricing ref={pricingRef} />
                <Testimonials ref={testimonialsRef} />
                <Contact ref={contactRef} />
                <Footer />
              </>
            }
          />
          <Route path="/fortune" element={<Fortune />} />
        </Routes>
      </div>

      {/* Audio Toggle Button */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-4 right-20 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;