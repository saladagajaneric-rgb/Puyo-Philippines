import { TEAM } from '../constants';
import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section id="about" className="section-container relative">
      <div className="absolute top-0 right-10 text-[20rem] chinese-accent opacity-[0.02]">
        居
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 geometric-card p-12 flex flex-col md:flex-row gap-12"
        >
          <div className="w-full md:w-1/3 aspect-[4/5] bg-slate-200 dark:bg-slate-800 overflow-hidden relative rounded-2xl border-2 border-puyo-jade shrink-0">
            <img 
              src="/images/janeric.puyo.jpg" 
              alt="Jan Eric Saladaga" 
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="uppercase tracking-[0.3em] text-[10px] font-black text-puyo-jade dark:text-emerald-500 mb-4">
              Founding Story
            </div>
            <h2 className="font-serif text-4xl mb-6 italic leading-tight">
              Jan Eric Saladaga
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 font-medium italic border-l-4 border-puyo-jade pl-6 mb-8">
              "In May 2026, he officially launched and assumed the position of ownership while taking his internship at a university, showing his interest and support for Cebu's growing business opportunities for real estate. Starting without any capital, he utilized his vision of improving Cebu's real estate landscape."
            </p>
            {/* Team grid moved below */}
          </div>
        </motion.div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="geometric-card p-8 flex-1">
            <h4 className="font-serif text-2xl mb-4 italic text-puyo-jade">Vision</h4>
            <p className="text-sm opacity-70 leading-relaxed">To be the most trusted name in high-end, culturally-rich real estate in the Philippines, blending heritage with progress.</p>
          </div>
          <div className="geometric-card p-8 flex-1">
            <h4 className="font-serif text-2xl mb-4 italic text-puyo-jade">Mission</h4>
            <p className="text-sm opacity-70 leading-relaxed">Blending traditional values with modern efficiency to deliver unparalleled property solutions for Cebu's landscape.</p>
          </div>
        </div>
      </div>

      {/* Project Managers Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {TEAM.map((member) => (
          <motion.div 
            key={member.name} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="geometric-card p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 border-2 border-puyo-jade/20 dark:border-emerald-500/20">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${member.name.includes('Jane') ? 'object-[center_15%]' : ''}`}
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <span className="text-sm text-slate-500">Photo</span>
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left mt-2">
              <p className="text-[10px] uppercase tracking-widest font-black text-puyo-jade dark:text-emerald-500 mb-2">{member.role}</p>
              <h3 className="font-serif text-2xl font-bold mb-3">{member.name}</h3>
              <p className="text-xs leading-relaxed opacity-70">
                Overseeing project development and ensuring our high standards are met in every detail.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
