import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, LayoutDashboard, MessageSquare, Globe, User } from 'lucide-react';

interface AdminNavbarProps {
  activeTab: 'listings' | 'messages';
  setActiveTab: (tab: 'listings' | 'messages') => void;
}

export default function AdminNavbar({ activeTab, setActiveTab }: AdminNavbarProps) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || null);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-jade-950/80 backdrop-blur-md border-b border-jade-100 dark:border-jade-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 flex items-center justify-center rounded-sm">
              <img src="/images/logo.png" alt="Puyo Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-puyo-jade dark:text-emerald-500 uppercase tracking-tighter">Admin Portal</span>
          </div>

          <div className="h-6 w-px bg-jade-100 dark:bg-jade-800 hidden md:block" />

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('listings')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'listings' ? 'text-puyo-jade dark:text-emerald-400' : 'text-jade-400 hover:text-jade-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Listings
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'messages' ? 'text-puyo-jade dark:text-emerald-400' : 'text-jade-400 hover:text-jade-600'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Inquiries
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {userEmail && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-jade-50 dark:bg-jade-900/40 border border-jade-100 dark:border-jade-800">
              <User className="w-3 h-3 text-puyo-jade dark:text-emerald-400" />
              <span className="text-[10px] font-medium text-jade-600 dark:text-jade-300">{userEmail}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-jade-400 hover:text-puyo-jade dark:hover:text-emerald-400 transition-all px-4 py-2 rounded-full border border-jade-100 dark:border-jade-800"
            >
              <Globe className="w-3 h-3" /> View Website
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-2 rounded-full transition-all"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
