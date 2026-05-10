import { Property } from '../types';
import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

interface Props {
  property: Property;
  onClick: (property: Property) => void;
}

export default function PropertyCard({ property, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col h-full cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-emerald-900/10"
      onClick={() => onClick(property)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={property.images[0]} 
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 bg-puyo-jade text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow-lg">
          {property.type === 'For Sale' ? 'Available' : 'Exclusive'}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-trad text-5xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none">
          布约
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg group-hover:text-puyo-jade dark:group-hover:text-emerald-500 transition-colors">
            {property.name}
          </h3>
          <span className="text-puyo-jade dark:text-emerald-500 font-bold">{property.price}</span>
        </div>
        <p className="text-[10px] text-slate-500 mb-6 flex items-center gap-1 font-medium">
          <MapPin size={10} /> {property.location}
        </p>
        
        <div className="flex gap-4 border-t border-slate-50 dark:border-slate-800 pt-4 mt-auto">
          <div className="text-[10px] flex flex-col font-bold">
            <span className="text-slate-400 uppercase tracking-widest text-[8px] mb-0.5">Area</span>
            {property.specs[0]}
          </div>
          <div className="text-[10px] flex flex-col font-bold">
            <span className="text-slate-400 uppercase tracking-widest text-[8px] mb-0.5">Category</span>
            {property.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
