import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/babagpt-logo-bgremove.png"; // Updated logo path for Babagpt
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';

const Header = ({ homeRef, aboutRef }) => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToHome = () => {
    navigate('/');
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    navigate('/');
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToFortune = () => {
    navigate('/fortune');
  };

  return (
    <header className="w-full dark:bg-gray-900 px-6 py-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={Logo} className="w-12 h-12 object-contain" alt="Babagpt Logo" />
          <a href="/" className="text-xl font-semibold text-orange-600 dark:text-orange-600">Babagpt</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a onClick={scrollToHome} className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
          <a onClick={navigateToFortune} className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Fortune</a>
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌞' : '🌜'}
          </button>
        </nav>

        {/* Hamburger Menu (for small screens) */}
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="text-gray-700 dark:text-gray-200">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white dark:bg-gray-800">
              <DrawerHeader>
                <DrawerTitle className="text-gray-800 dark:text-white">Menu</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="outline" className="ml-auto text-gray-700 dark:text-gray-200">✖️</Button>
                </DrawerClose>
              </DrawerHeader>

              {/* Mobile Navigation in Drawer */}
              <nav className="flex flex-col space-y-4 text-lg font-medium text-center">
                <a onClick={scrollToHome} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
                <a onClick={navigateToFortune} className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">Fortune</a>
              </nav>

              {/* Theme Toggle Button in Drawer */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? '🌞' : '🌜'}
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;