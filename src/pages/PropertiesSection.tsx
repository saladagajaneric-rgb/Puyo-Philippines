import { useState, useEffect } from 'react';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onSelectProperty: (property: Property) => void;
}

export default function PropertiesSection({ onSelectProperty }: Props) {
  const [filter, setFilter] = useState<'All' | 'For Sale' | 'For Rent'>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Lot' | 'House & Lot' | 'Condo'>('All');
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Price: Low to High' | 'Price: High to Low'>('Newest');
  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase
        .from('properties')
        .select('*');
      
      if (!error && data) {
        setDbProperties(data);
      }
      setLoading(false);
    }
    fetchProperties();
  }, []);

  // Combine hardcoded and DB properties
  const allProperties = [...PROPERTIES, ...dbProperties];

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const filteredProperties = allProperties.filter(p => {
    const typeMatch = filter === 'All' ? true : p.type === filter;
    const categoryMatch = categoryFilter === 'All' ? true : p.category === categoryFilter;
    
    return typeMatch && categoryMatch;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOrder === 'Price: Low to High') return parsePrice(a.price) - parsePrice(b.price);
    if (sortOrder === 'Price: High to Low') return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });

  return (
    <section id="properties" className="section-container relative">
      <div className="absolute top-[20%] left-[-2%] text-[25rem] chinese-accent opacity-[0.03] -rotate-12">
        宅
      </div>

      <div className="mb-12 relative z-10 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-10">
          <div>
            <div className="uppercase tracking-[0.4em] text-[10px] font-black text-puyo-jade dark:text-emerald-500 mb-4">
              Curated Listings
            </div>
            <h2 className="font-serif text-4xl md:text-5xl italic">
              Exceptional Properties.
            </h2>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold hidden lg:block mb-2">Cebu, Philippines</div>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6 items-center">
          {/* Type Filter */}
          <div className="flex gap-6">
            {(['All', 'For Sale', 'For Rent'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] pb-1 transition-all border-b-2 ${
                  filter === type 
                    ? 'border-puyo-jade text-puyo-jade dark:text-emerald-500' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          {/* Category Filter */}
          <div className="flex gap-6">
            {(['All', 'Lot', 'House & Lot', 'Condo'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] pb-1 transition-all border-b-2 ${
                  categoryFilter === cat 
                    ? 'border-puyo-jade text-puyo-jade dark:text-emerald-500' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 hidden md:block" />

          {/* Sort Filter */}
          <div className="flex gap-6">
            {(['Newest', 'Price: Low to High', 'Price: High to Low'] as const).map((order) => (
              <button
                key={order}
                onClick={() => setSortOrder(order)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] pb-1 transition-all border-b-2 ${
                  sortOrder === order 
                    ? 'border-puyo-jade text-puyo-jade dark:text-emerald-500' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {order}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {sortedProperties.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <PropertyCard property={property} onClick={onSelectProperty} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProperties.length === 0 && (
        <div className="py-32 text-center opacity-40 italic font-serif text-xl border border-dashed border-jade-200 dark:border-jade-800 rounded-sm">
          More exclusive properties arriving soon.
        </div>
      )}
    </section>
  );
}
