
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const FloatingNavBar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { currentUser, logout } = useAuth();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show on scroll up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Hide on scroll down
      else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      // Check if scrolled for styling
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { to: "/dashboard", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Dashboard" },
    { to: "/store", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M3 6L6 2H18L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 10V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 14V8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 6H3C2.44772 6 2 6.44772 2 7V9C2 9.55228 2.44772 10 3 10H21C21.5523 10 22 9.55228 22 9V7C22 6.44772 21.5523 6 21 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Store" },
    { to: "/redeem", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Redeem" },
    { to: "/downloads", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Downloads" },
    { to: "/guides", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M4 19.5V4.5C4 4.10218 4.15804 3.72064 4.43934 3.43934C4.72064 3.15804 5.10218 3 5.5 3H20.5C20.8978 3 21.2794 3.15804 21.5607 3.43934C21.842 3.72064 22 4.10218 22 4.5V19.5C22 19.8978 21.842 20.2794 21.5607 20.5607C21.2794 20.842 20.8978 21 20.5 21H5.5C5.10218 21 4.72064 20.842 4.43934 20.5607C4.15804 20.2794 4 19.8978 4 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Guides" }
  ];

  const NavItem: React.FC<{
    to: string;
    icon: React.ReactNode;
    label: string;
  }> = ({ to, icon, label }) => {
    return (
      <NavLink 
        to={to}
        className={({ isActive }) => 
          `flex items-center space-x-2 py-2 px-3 rounded-xl transition-all duration-300 ${
            isActive 
              ? "text-teal-DEFAULT font-medium bg-secondary/50" 
              : "text-gray-400 hover:text-white hover:bg-secondary/30"
          }`
        }
      >
        <div className="transition-transform duration-200">
          {icon}
        </div>
        <span className="transition-transform duration-200">{label}</span>
      </NavLink>
    );
  };

  return (
    <nav
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-white/5" : "bg-transparent",
        isVisible ? "top-0" : "-top-20", // Hide nav by sliding up
        "animate-fade-in"
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center group">
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-DEFAULT to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-DEFAULT/20 group-hover:shadow-teal-DEFAULT/30 transition-all duration-300">
                  W
                </div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-teal-DEFAULT transition-colors duration-300">Walker</span>
            </NavLink>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {currentUser ? (
                <>
                  {navItems.map((item) => (
                    <NavItem 
                      key={item.label}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                    />
                  ))}
                  <div className="flex items-center ml-2 space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="rounded-full text-gray-400 hover:text-white hover:bg-secondary/30"
                    >
                      <Bell size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="rounded-full text-gray-400 hover:text-white hover:bg-secondary/30"
                    >
                      <Search size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={logout}
                      className="rounded-full text-gray-400 hover:text-white hover:bg-secondary/30"
                    >
                      <LogOut size={18} />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {navItems.map((item) => (
                    <NavItem 
                      key={item.label}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                    />
                  ))}
                  <NavLink to="/login">
                    <Button 
                      variant="outline" 
                      className="ml-4 bg-transparent border border-teal-DEFAULT/30 text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white transition-all duration-300"
                    >
                      Login
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-card backdrop-blur-lg shadow-lg">
          {currentUser ? (
            <>
              {navItems.map((item) => (
                <NavItem 
                  key={item.label}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent border border-teal-DEFAULT/30 text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white"
                  onClick={logout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              {navItems.map((item) => (
                <NavItem 
                  key={item.label}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
              <div className="pt-2">
                <NavLink to="/login" className="block w-full">
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border border-teal-DEFAULT/30 text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white"
                  >
                    Login
                  </Button>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavBar;
