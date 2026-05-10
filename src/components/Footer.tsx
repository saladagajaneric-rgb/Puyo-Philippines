import { CONTACT_INFO } from '../constants';
import { Mail, Instagram, Facebook, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-puyo-jade text-white py-20 px-6 overflow-hidden relative border-t-[8px] border-emerald-900/40 shadow-[0_-20px_50px_rgba(0,75,62,0.1)]">
      {/* Abstract Chinese Character in background */}
      <div className="absolute top-1/2 left-[-5%] -translate-y-1/2 text-[35rem] chinese-accent opacity-[0.03] rotate-[15deg] text-emerald-50 pointer-events-none select-none mix-blend-overlay">
        埔
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-serif italic mb-6">Puyo Philippines</h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-sm mb-8">
              Improving Cebu's real estate landscape by blending heritage with modern progress. 
              Discover unparalleled property solutions tailored just for you.
            </p>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/50 transition-all duration-300 text-emerald-100 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/50 transition-all duration-300 text-emerald-100 hover:text-white">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-black mb-8 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-1/2 h-px bg-emerald-500/50"></span>
            </h4>
            <div className="flex flex-col gap-6">
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-emerald-800/40 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm border border-emerald-700/30">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-emerald-200/50 uppercase font-black tracking-widest mb-1">Phone</p>
                  <p className="text-sm font-medium text-emerald-50 group-hover:text-white transition-colors">{CONTACT_INFO.phone}</p>
                </div>
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-emerald-800/40 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm border border-emerald-700/30">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-emerald-200/50 uppercase font-black tracking-widest mb-1">Email</p>
                  <p className="text-sm font-medium text-emerald-50 group-hover:text-white transition-colors truncate max-w-[200px]">{CONTACT_INFO.email}</p>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-black mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-px bg-emerald-500/50"></span>
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-emerald-100/70 font-medium">
              <li><a href="/#home" className="flex items-center gap-3 hover:text-white hover:translate-x-2 transition-all duration-300"><ArrowRight size={14} className="text-emerald-500" /> Home</a></li>
              <li><a href="/#about" className="flex items-center gap-3 hover:text-white hover:translate-x-2 transition-all duration-300"><ArrowRight size={14} className="text-emerald-500" /> About Us</a></li>
              <li><a href="/#properties" className="flex items-center gap-3 hover:text-white hover:translate-x-2 transition-all duration-300"><ArrowRight size={14} className="text-emerald-500" /> Properties</a></li>
              <li><Link to="/sell" className="flex items-center gap-3 hover:text-white hover:translate-x-2 transition-all duration-300"><ArrowRight size={14} className="text-emerald-500" /> Sell Your Property</Link></li>
              <li><Link to="/login" className="flex items-center gap-3 hover:text-white hover:translate-x-2 transition-all duration-300 opacity-50 hover:opacity-100"><ArrowRight size={14} className="text-emerald-500" /> Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-[0.2em] font-medium uppercase text-emerald-200/30">
            © 2026 Puyo Philippines. All rights reserved.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-500 hover:text-white transition-colors bg-white/5 hover:bg-emerald-600 px-4 py-2 rounded-full border border-white/5">
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
