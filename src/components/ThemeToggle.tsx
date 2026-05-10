import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-jade-100 dark:bg-jade-900/50 text-puyo-jade dark:text-jade-400 transition-colors"
      aria-label="Toggle Night Mode"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 20 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
