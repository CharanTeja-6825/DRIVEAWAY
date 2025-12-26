import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/button';
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';
import Input from '../ui/input';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.pickupDate) params.append('pickup', searchData.pickupDate);
    if (searchData.returnDate) params.append('return', searchData.returnDate);
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 dark:from-black dark:via-primary-950 dark:to-primary-900" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-gold rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-scale-in">
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="text-sm text-white font-medium">
              Premium Car Rentals Made Easy
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-fluid-5xl font-display font-bold text-white mb-6 leading-tight animate-slide-up">
            Drive Your <span className="text-accent-gold">Dream Car</span>
            <br />
            Anytime, Anywhere
          </h1>

          {/* Subtitle */}
          <p className="text-fluid-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Experience luxury and convenience with our premium fleet of vehicles. 
            Book in minutes, drive in style.
          </p>

          {/* Search Form */}
          <div className="glass rounded-2xl p-6 md:p-8 shadow-2xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="text"
                placeholder="City or Airport"
                value={searchData.location}
                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                icon={<MapPin className="w-5 h-5" />}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Input
                type="date"
                placeholder="Pick-up Date"
                value={searchData.pickupDate}
                onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                icon={<Calendar className="w-5 h-5" />}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Input
                type="date"
                placeholder="Return Date"
                value={searchData.returnDate}
                onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                icon={<Calendar className="w-5 h-5" />}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                variant="gold"
                size="lg"
                icon={<Search className="w-5 h-5" />}
                className="w-full"
              >
                Search Cars
              </Button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Premium Cars</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </div>
  );
};

export default HeroSection;
