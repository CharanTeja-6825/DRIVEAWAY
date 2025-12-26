import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/button';
import { 
  Menu, X, Sun, Moon, User, LogOut, Car, 
  ChevronDown, Settings, Heart 
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const getUserName = () => {
    if (!user) return '';
    return user.customer_name || user.dealer_ship_name || user.username || 'User';
  };

  const getUserInitial = () => {
    const name = getUserName();
    return name ? name[0].toUpperCase() : 'U';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold group"
          >
            <div className="relative">
              <Car className="w-8 h-8 text-primary-500 group-hover:text-accent-gold transition-colors" />
              <div className="absolute -inset-1 bg-primary-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="gradient-text">DriveAway</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/cars"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Browse Cars
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-gold flex items-center justify-center text-white font-semibold">
                    {getUserInitial()}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {getUserName()}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0" 
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 glass rounded-xl shadow-2xl py-2 animate-slide-down">
                      <Link
                        to={`/${user.role}/dashboard`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-5 h-5 text-primary-500" />
                        <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
                      </Link>
                      {user.role === 'customer' && (
                        <Link
                          to="/customer/bookings"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Heart className="w-5 h-5 text-primary-500" />
                          <span className="text-gray-700 dark:text-gray-300">My Bookings</span>
                        </Link>
                      )}
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5 text-primary-500" />
                        <span className="text-gray-700 dark:text-gray-300">Settings</span>
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-primary-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-accent-red"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Button variant="ghost" onClick={() => navigate('/customer/login')}>
                  Login
                </Button>
                <Button variant="gold" onClick={() => navigate('/customer/register')}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 glass rounded-xl p-4 animate-slide-down">
            <div className="flex flex-col gap-4">
              <Link
                to="/cars"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Cars
              </Link>
              <Link
                to="/how-it-works"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <hr className="border-gray-200 dark:border-primary-700" />
              {user ? (
                <>
                  <Link
                    to={`/${user.role}/dashboard`}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-500 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-accent-red font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate('/customer/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="gold"
                    className="w-full"
                    onClick={() => {
                      navigate('/customer/register');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
