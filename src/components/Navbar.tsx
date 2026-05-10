import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About Us', href: '/#about' },
    { name: 'Properties', href: '/#properties' },
    { name: 'Sell', href: '/sell' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center rounded-sm">
            <img src="/images/logo.png" alt="Puyo Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tighter text-puyo-jade dark:text-emerald-500 uppercase leading-none">
              Puyo <span className="font-light italic text-sm normal-case tracking-normal opacity-80">Philippines</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-puyo-jade dark:hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-puyo-jade dark:hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 ml-2" />
          <ThemeToggle />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-puyo-jade dark:text-jade-400">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-puyo-paper dark:bg-jade-950 border-b border-jade-100 dark:border-jade-900 md:hidden"
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-puyo-jade dark:hover:text-jade-400"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-puyo-jade dark:hover:text-jade-400"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}



