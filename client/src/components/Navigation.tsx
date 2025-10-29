import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Home, User, Briefcase, Mail, FileText, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastClickRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Prevent scroll-based updates for a short time after a nav click to avoid
      // immediate overwrite of the `activeSection` we set on click (mobile UX fix).
      const now = Date.now();
      if (lastClickRef.current && now - lastClickRef.current < 700) return;

      // Update active section based on scroll position with dynamic offset
      const sections = ["home", "about", "portfolio", "services", "contact"];
      // compute nav height (use first child/top-bar to avoid inflated mobile menu height)
      const navEl = document.querySelector("nav");
      let navHeight = 80;
      if (navEl) {
        const firstChild = (navEl as HTMLElement).firstElementChild as HTMLElement | null;
        navHeight = firstChild ? firstChild.offsetHeight : (navEl as HTMLElement).offsetHeight;
      }
      const offset = navHeight + 20; // pixels from top to consider "in view"

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus first mobile nav item when menu opens for accessibility
  useEffect(() => {
    if (isMobileMenuOpen) {
      const t = setTimeout(() => {
        const first = document.querySelector('#mobile-navigation a, #mobile-navigation button');
        (first as HTMLElement | null)?.focus();
      }, 120);
      return () => clearTimeout(t);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Check system preference for dark mode
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Portfolio", href: "#portfolio", icon: Briefcase },
    { name: "Services", href: "#services", icon: Sparkles },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  const scrollToSection = (href: string, opts?: { forceCloseImmediate?: boolean }) => {
    try {
      const element = document.querySelector(href) as HTMLElement | null;
      if (element) {
        // mark last click time so scroll handler can ignore transient scroll updates
        lastClickRef.current = Date.now();
        // Immediately set active section so header updates right away when clicked
        try {
          setActiveSection(href.replace(/^#/, ""));
        } catch (e) {
          /* ignore */
        }

        // Calculate offset to account for fixed nav height so we land at the correct section
        const navEl = document.querySelector('nav');
        // Use the top bar height (first child) instead of full nav height so
        // an expanded mobile menu doesn't inflate the offset and misplace the target.
        let navHeight = 80;
        if (navEl) {
          const firstChild = (navEl as HTMLElement).firstElementChild as HTMLElement | null;
          navHeight = firstChild ? firstChild.offsetHeight : (navEl as HTMLElement).offsetHeight;
        }
        const rect = element.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - navHeight - 12; // small gap

        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });

        // update the fragment (adds history entry)
        try {
          history.pushState(null, "", href);
        } catch (e) {
          window.location.hash = href;
        }

        // Close the mobile menu after a short delay so the smooth scroll isn't interrupted
        if (isMobileMenuOpen) {
          if (opts?.forceCloseImmediate) {
            setIsMobileMenuOpen(false);
          } else {
            // Slightly longer on mobile to ensure the browser completes the smooth scroll
            setTimeout(() => setIsMobileMenuOpen(false), 600);
          }
        }
      } else {
        // if element not found, navigate to the hash (useful if sections are on another page)
        window.location.href = `${window.location.pathname}${href}`;
      }
    } catch (err) {
      console.error("Navigation.scrollToSection error:", err);
      window.location.href = `${window.location.pathname}${href}`;
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl shadow-2xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center sm:items-start"
          >
            <div className="flex items-center space-x-3 group cursor-pointer">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                  onClick={() => scrollToSection('#home', { forceCloseImmediate: true })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') scrollToSection('#home', { forceCloseImmediate: true }); }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  />
                </motion.div>
              <div className="text-lg sm:text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Habtamu.dev
              </div>
            </div>
            
            {/* Icon Navigation */}
            <div className="hidden xs:flex items-center space-x-1 sm:space-x-2 mt-2">
              {navItems.slice(0, 3).map((item) => (
                <motion.a
                  key={item.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "bg-primary/20 text-primary shadow-md"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/10"
                  }`}
                  title={item.name}
                >
                  <item.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Tablet Navigation */}
          <div className="hidden sm:flex md:hidden items-center space-x-1">
            {navItems.slice(0, 4).map((item) => (
              <motion.a
                key={item.name}
                whileHover={{ scale: 1.05 }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-primary bg-primary/20 shadow-sm"
                    : "text-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                whileHover={{ scale: 1.05, y: -2 }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative ${
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                onClick={() => scrollToSection("#contact")}
                className="px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Let's Talk
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsMobileMenuOpen((v) => !v);
              }}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl mt-3"
            >
              <motion.div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl text-left transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? "bg-primary/20 text-primary shadow-sm"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
                
                <motion.div
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: navItems.length * 0.1 }}
                  className="px-4 pt-2"
                >
                  <Button
                    variant="default"
                    onClick={() => scrollToSection("#contact")}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Let's Talk
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;