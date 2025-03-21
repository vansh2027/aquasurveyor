
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropletIcon, MenuIcon, X } from 'lucide-react';

const NavItem = ({ href, label, active }: { href: string; label: string; active: boolean }) => (
  <Link 
    to={href} 
    className={cn(
      "relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md",
      active 
        ? "text-aqua-700" 
        : "text-gray-700 hover:text-aqua-600"
    )}
  >
    {label}
    {active && (
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-aqua-500 rounded-full"
        layoutId="navbar-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/map', label: 'Map' },
    { href: '/survey', label: 'Survey' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-aqua-600 transition-all duration-300 hover:text-aqua-700"
            >
              <motion.div 
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-aqua-400 to-aqua-600 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DropletIcon size={20} className="text-white" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight">AquaSurveyor</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.href} 
                href={item.href} 
                label={item.label} 
                active={location.pathname === item.href}
              />
            ))}
            <motion.button
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-aqua-500 to-aqua-600 rounded-md shadow-sm button-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Sign In
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.href
                    ? "bg-aqua-50 text-aqua-700"
                    : "text-gray-700 hover:bg-aqua-50 hover:text-aqua-600"
                )}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-aqua-500 to-aqua-600 rounded-md">
              Sign In
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
