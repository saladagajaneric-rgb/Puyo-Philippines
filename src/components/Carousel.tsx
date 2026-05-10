import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HOUSING_INSIGHTS } from '../constants';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HOUSING_INSIGHTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-44 flex items-center justify-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-2xl px-6"
        >
          <div className="uppercase tracking-[0.4em] text-[9px] font-black text-white/60 mb-3">
            Expert Insight {String(currentIndex + 1).padStart(2, '0')}/03
          </div>
          <h3 className="font-serif text-2xl md:text-3xl mb-4 italic leading-tight text-white">
            {HOUSING_INSIGHTS[currentIndex].content}
          </h3>
          <div className="flex justify-center gap-2 mt-6">
            {HOUSING_INSIGHTS.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 transition-all duration-700 ${
                  idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
