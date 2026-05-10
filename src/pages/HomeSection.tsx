import { motion } from 'motion/react';
import Carousel from '../components/Carousel';
import { ArrowRight } from 'lucide-react';

export default function HomeSection() {
  return (
    <section id="home" className="pt-32 min-h-screen flex flex-col justify-center relative">
      <div className="absolute top-[10%] left-[5%] text-[15rem] chinese-accent opacity-[0.03] rotate-12">
        山
      </div>
      <div className="absolute bottom-[10%] right-[5%] text-[18rem] chinese-accent opacity-[0.03] -rotate-12">
        水
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16"
        >
          <div className="uppercase tracking-[0.5em] text-[10px] font-black text-puyo-jade dark:text-emerald-500 mb-6 font-sans">
            Real Estate Development
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.95] tracking-tighter">
            Elevating <br />
            <span className="italic font-light">Cebu's Landscape.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-60 font-medium leading-relaxed mb-12 text-slate-500">
             Professional, high-end real estate solutions rooted in vision and excellence. 
             Discover your next investment in Puyo, Philippines.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-puyo-jade rounded-3xl overflow-hidden relative group flex shadow-2xl shadow-emerald-900/20"
        >
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative bg-gradient-to-br from-puyo-jade via-emerald-950 to-puyo-jade dark:from-slate-900 dark:to-slate-950">
            <Carousel />
            {/* Background elements for hero box */}
            <div className="absolute top-10 right-10 opacity-10 text-8xl font-trad text-white">福</div>
            <div className="absolute bottom-10 left-10 opacity-10 text-8xl font-trad text-white">居</div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 mb-20 flex justify-center gap-8 relative z-10">
        <a href="#properties" className="jade-button py-4 px-12 rounded-xl text-xs bg-emerald-700 hover:bg-emerald-800 shadow-emerald-900/40">
          Explore Properties
        </a>
        <a href="#contact" className="px-12 py-4 font-bold uppercase tracking-widest text-[10px] text-puyo-jade dark:text-emerald-400 transition-colors border border-emerald-100 dark:border-emerald-900/50 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          Contact Our Team
        </a>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 overflow-hidden px-4 opacity-40">
        <div className="flex items-center gap-4 whitespace-nowrap text-[9px] uppercase tracking-[1em] font-black animate-bounce text-puyo-jade dark:text-emerald-500">
          <div className="w-px h-8 bg-current mx-auto" />
        </div>
      </div>
    </section>
  );
}
