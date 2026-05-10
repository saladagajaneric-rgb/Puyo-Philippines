import { Property } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Ruler, Home, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetailView({ property, onClose }: Props) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Prevent scrolling when detail view is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-puyo-paper dark:bg-jade-950 overflow-y-auto"
    >
      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => setFullscreenImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={fullscreenImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] p-3 bg-white dark:bg-jade-900 shadow-xl rounded-full text-puyo-jade dark:text-jade-400 hover:scale-110 transition-transform"
      >
        <X size={24} />
      </button>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 mb-12 transition-opacity"
        >
          <ArrowLeft size={14} /> Back to listing
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-2 aspect-video rounded-sm overflow-hidden shadow-2xl cursor-zoom-in"
                onClick={() => setFullscreenImage(property.images[0])}
              >
                <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
              </motion.div>
              {property.images.slice(1).map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i + 1) }}
                  className="aspect-square rounded-sm overflow-hidden cursor-zoom-in"
                  onClick={() => setFullscreenImage(img)}
                >
                  <img src={img} alt={`${property.name} ${i + 1}`} className="w-full h-full object-cover shadow-lg" />
                </motion.div>
              ))}
              {/* If only one image, show placeholder/pattern */}
              {property.images.length === 1 && (
                <div className="aspect-square bg-jade-100/50 dark:bg-jade-900/50 rounded-sm flex items-center justify-center">
                   <div className="text-4xl chinese-accent grayscale opacity-50">美</div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-32 h-fit">
            <div className="uppercase tracking-[0.3em] text-xs font-bold text-puyo-jade dark:text-jade-400 mb-4">
              {property.category} • {property.type}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl mb-4 leading-tight">
              {property.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-jade-100 dark:border-jade-800 pb-8">
              <div className="flex items-center gap-2 text-lg opacity-60">
                <MapPin size={20} className="shrink-0" />
                <span>{property.location}</span>
              </div>
              {property.mapUrl && (
                <a 
                  href={property.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  View on Google Maps <ArrowLeft className="rotate-180" size={12} />
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-jade-50 dark:bg-jade-900 rounded-sm flex items-center justify-center text-puyo-jade dark:text-jade-400">
                  <Ruler size={24} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold opacity-40">Lot Area</div>
                  <div className="font-medium">{property.specs[0]}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-jade-50 dark:bg-jade-900 rounded-sm flex items-center justify-center text-puyo-jade dark:text-jade-400">
                  <Home size={24} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold opacity-40">Classification</div>
                  <div className="font-medium">{property.specs[1] || 'Residential'}</div>
                </div>
              </div>
            </div>

            <div className="prose prose-jade dark:prose-invert max-w-none mb-12">
              <h4 className="font-serif text-xl mb-4">Description</h4>
              <p className="opacity-70 leading-relaxed font-light">
                {property.description}
              </p>
            </div>

            {property.mapEmbedUrl && (
              <div className="mb-12 rounded-sm overflow-hidden border border-jade-100 dark:border-jade-800 shadow-lg">
                <iframe 
                  src={property.mapEmbedUrl} 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                ></iframe>
              </div>
            )}

            {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
              <div className="mb-12">
                <h4 className="font-serif text-xl mb-6">Nearby Landmarks</h4>
                <div className="grid grid-cols-2 gap-4">
                  {property.nearbyLandmarks.map((landmark, idx) => (
                    <div key={idx} className="group relative aspect-video rounded-sm overflow-hidden shadow-md">
                      {landmark.image && (
                        <img src={landmark.image} alt={landmark.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                        <span className="text-[10px] text-white font-bold uppercase tracking-widest">{landmark.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-jade-50 dark:bg-jade-900/30 p-8 rounded-sm border border-jade-100 dark:border-jade-800 mb-12">
              <div className="text-xs uppercase font-bold opacity-40 mb-2">Price Estimate</div>
              <div className="font-serif text-4xl text-puyo-jade dark:text-jade-400 mb-6">{property.price}</div>
              <a href="#contact" onClick={onClose} className="jade-button block w-full text-center">
                Inquire Now
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 mb-6">
              <h4 className="font-serif text-xl">Key Specifications</h4>
              {property.mapUrl && (
                <a 
                  href={property.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  View on Maps <ArrowLeft className="rotate-180" size={12} />
                </a>
              )}
            </div>
              <ul className="grid grid-cols-1 gap-4">
                {property.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm opacity-70">
                    <CheckCircle2 size={16} className="text-puyo-jade dark:text-jade-400" />
                    <span>{spec}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-sm opacity-70">
                  <CheckCircle2 size={16} className="text-puyo-jade dark:text-jade-400" />
                  <span>Transfer Ready</span>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
