import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    // Security: Honeypot check
    if (formData.get('botcheck')) {
      console.warn('Bot detected via honeypot');
      return;
    }

    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const msg = formData.get('message') as string;
    const inquire_as = formData.get('inquire_as') as string;
    const inquiry_type = formData.get('inquiry_type') as string;

    try {
      // 1. Save to Supabase (Admin Mailbox)
      const { error: supabaseError } = await supabase
        .from('inquiries')
        .insert([{
          name: `${first_name} ${last_name}`,
          email: email,
          message: `[${inquire_as} - ${inquiry_type}] Phone: ${phone}\n\n${msg}`,
          status: 'new'
        }]);

      if (supabaseError) throw supabaseError;

      // 2. Send to Web3Forms (Email Notification)
      formData.append('access_key', 'ce651c33-0f62-41e6-93e1-6507969ab8ab'); 
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Thank you! Your inquiry has been sent to our team and saved in our records.');
        formElement.reset();
      } else {
        setStatus('error');
        setMessage(data.message || 'Email delivery failed, but your inquiry was saved in our admin portal.');
      }
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setMessage('Failed to send inquiry. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section-container relative py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="absolute top-[10%] right-[-5%] text-[30rem] chinese-accent opacity-[0.02] rotate-12 pointer-events-none select-none">
        信
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="uppercase tracking-[0.4em] text-[10px] font-black text-puyo-jade dark:text-emerald-500 mb-4">
            Connect with Us
          </div>
          <h2 className="font-serif text-5xl italic mb-6">Contact Us.</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Whether you're looking to buy, sell, or invest, our team is ready to guide you through Cebu's premier real estate landscape.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-sm shadow-2xl shadow-emerald-900/5 border border-slate-100 dark:border-slate-800"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot Spam Protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dropdowns */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">I'm here to inquire as a/an</label>
                <select 
                  name="inquire_as"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors appearance-none"
                >
                  <option value="Interested Buyer">Interested Buyer</option>
                  <option value="Property Owner">Property Owner</option>
                  <option value="Agent / Broker">Agent / Broker</option>
                  <option value="Investment Partner">Investment Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Inquiry Type</label>
                <select 
                  name="inquiry_type"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors appearance-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Property Viewing">Property Viewing</option>
                  <option value="Sell My Property">Sell My Property</option>
                  <option value="Investment Inquiry">Investment Inquiry</option>
                </select>
              </div>
            </div>

            {/* Name Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">First Name *</label>
                <input 
                  type="text" 
                  name="first_name" 
                  required 
                  placeholder="e.g. Juan"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Middle Name</label>
                <input 
                  type="text" 
                  name="middle_name" 
                  placeholder="Optional"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Last Name *</label>
                <input 
                  type="text" 
                  name="last_name" 
                  required 
                  placeholder="e.g. Dela Cruz"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors"
                />
              </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Your Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="juan@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Contact Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="+63 XXX XXX XXXX"
                  pattern="[0-9+ \-]{7,20}"
                  title="Please enter a valid phone number"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest opacity-50">Message *</label>
              <textarea 
                name="message" 
                required
                rows={4}
                placeholder="How can we help you today?"
                className="w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 focus:border-puyo-jade outline-none transition-colors resize-none"
              ></textarea>
            </div>

            {/* Consent */}
            <div className="flex gap-4 items-start">
              <input type="checkbox" required id="privacy" className="mt-1 accent-puyo-jade" />
              <label htmlFor="privacy" className="text-[11px] text-slate-500 leading-relaxed font-light">
                By submitting this form, I certify that I have read and accept the Privacy Policy and authorize Puyo Philippines, its representatives and third party service providers to contact me for marketing or promotional information.
              </label>
            </div>

            {/* Submit Button & Status */}
            <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="jade-button w-full md:w-auto min-w-[200px] flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
                <span>{status === 'loading' ? 'Sending...' : 'Send Inquiry'}</span>
              </button>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                >
                  <CheckCircle2 size={18} />
                  <span>{message}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-medium"
                >
                  <AlertCircle size={18} />
                  <span>{message}</span>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
