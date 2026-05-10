import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Property } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit3, X, Save, Image as ImageIcon, MapPin, Tag, Layout } from 'lucide-react';

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    name: '',
    location: '',
    price: '',
    type: 'For Sale',
    category: 'Lot',
    description: '',
    specs: [],
    images: [],
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProperties(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingProperty) {
      const { error } = await supabase
        .from('properties')
        .update(formData)
        .eq('id', editingProperty.id);
      
      if (!error) {
        setIsModalOpen(false);
        fetchProperties();
      }
    } else {
      const { error } = await supabase
        .from('properties')
        .insert([formData]);
      
      if (!error) {
        setIsModalOpen(false);
        setFormData({ name: '', location: '', price: '', type: 'For Sale', category: 'Lot', description: '', specs: [], images: [] });
        fetchProperties();
      }
    }
    setLoading(false);
  };

  const deleteProperty = async (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (!error) fetchProperties();
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-jade-50/50 dark:bg-jade-950/20">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-jade-900 dark:text-jade-50">Manage Listings</h1>
            <p className="text-jade-600 dark:text-jade-400 mt-2">Add, update, or remove properties from your website.</p>
          </div>
          <button 
            onClick={() => { setEditingProperty(null); setFormData({ name: '', location: '', price: '', type: 'For Sale', category: 'Lot', description: '', specs: [], images: [] }); setIsModalOpen(true); }}
            className="jade-button flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Property
          </button>
        </div>

        {loading && properties.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-white dark:bg-jade-900/40 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <motion.div 
                layout
                key={property.id}
                className="bg-white dark:bg-jade-950 rounded-3xl overflow-hidden border border-jade-100 dark:border-jade-800 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={property.name}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => { setEditingProperty(property); setFormData(property); setIsModalOpen(true); }}
                      className="p-2 bg-white/90 dark:bg-jade-900/90 rounded-full text-puyo-jade dark:text-emerald-400 hover:scale-110 transition-transform"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteProperty(property.id)}
                      className="p-2 bg-white/90 dark:bg-jade-900/90 rounded-full text-red-500 hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                    <span className="text-puyo-jade dark:text-emerald-500 font-bold">{property.price}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-jade-900 dark:text-jade-50 mb-1">{property.name}</h3>
                  <p className="text-sm text-jade-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {property.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-jade-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-4xl bg-white dark:bg-jade-950 rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-jade-100 dark:border-jade-800 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-jade-50 dark:hover:bg-jade-900 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="admin-label">Property Name</label>
                      <div className="relative">
                        <Layout className="admin-icon" />
                        <input 
                          type="text" required className="admin-input" placeholder="e.g. Yanessa Country Homes"
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="admin-label">Location</label>
                      <div className="relative">
                        <MapPin className="admin-icon" />
                        <input 
                          type="text" required className="admin-input" placeholder="e.g. Consolacion, Cebu"
                          value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Price</label>
                        <div className="relative">
                          <Tag className="admin-icon" />
                          <input 
                            type="text" required className="admin-input" placeholder="PHP 1,000,000"
                            value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="admin-label">Category</label>
                        <select 
                          className="admin-input appearance-none"
                          value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}
                        >
                          <option value="Lot">Lot</option>
                          <option value="House & Lot">House & Lot</option>
                          <option value="Condo">Condo</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="admin-label">Listing Type</label>
                      <div className="flex gap-4">
                        {['For Sale', 'For Rent'].map(type => (
                          <button 
                            key={type} type="button"
                            onClick={() => setFormData({...formData, type: type as any})}
                            className={`flex-1 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                              formData.type === type ? 'bg-puyo-jade text-white border-puyo-jade' : 'bg-jade-50 dark:bg-jade-900/50 border-jade-100 dark:border-jade-800 text-jade-500'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="admin-label">Description</label>
                      <textarea 
                        className="admin-input min-h-[120px] py-4" placeholder="Describe the property..."
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="admin-label">Image URL (First image is main cover)</label>
                      <div className="relative">
                        <ImageIcon className="admin-icon" />
                        <input 
                          type="text" className="admin-input" placeholder="Paste image link here"
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const url = (e.target as HTMLInputElement).value;
                              if (url) {
                                setFormData({...formData, images: [...(formData.images || []), url]});
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {formData.images?.map((img, idx) => (
                          <div key={idx} className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-jade-200">
                            <img src={img} className="w-full h-full object-cover" />
                            <button 
                              type="button" onClick={() => setFormData({...formData, images: formData.images?.filter((_, i) => i !== idx)})}
                              className="absolute inset-0 bg-red-500/80 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-jade-500 uppercase tracking-widest text-[10px]">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="jade-button flex-1 py-4 flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Listing'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
