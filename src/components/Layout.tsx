import React from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  GitBranch, 
  ShieldCheck, 
  HelpCircle, 
  Settings, 
  LogOut,
  Bell
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { currentProject, projects, setCurrentProject } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'discovery', label: 'Data Discovery', icon: Search },
    { id: 'pipelines', label: 'Data Pipelines', icon: GitBranch },
    { id: 'governance', label: 'Data Governance', icon: ShieldCheck },
    { id: 'help', label: 'Help and Resources', icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">DG</span>
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">Data Gateway</h1>
            <p className="text-[10px] text-slate-400">A one stop data solution</p>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentPage === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
            <Settings size={18} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all ${
              !currentProject ? 'bg-amber-50 border-amber-200' : 'bg-slate-100 border-slate-200'
            }`}>
              <span className="text-xs font-medium text-slate-500">Workspace:</span>
              <select 
                value={currentProject?.id || 'adhoc'} 
                onChange={(e) => {
                  if (e.target.value === 'adhoc') {
                    setCurrentProject(null);
                  } else {
                    const p = projects.find(proj => proj.id === e.target.value);
                    if (p) setCurrentProject(p);
                  }
                }}
                className={`text-xs font-bold bg-transparent border-none focus:ring-0 cursor-pointer ${
                  !currentProject ? 'text-amber-700' : 'text-slate-900'
                }`}
              >
                <option value="adhoc">✨ Ad-hoc Workspace</option>
                <optgroup label="Projects">
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold">Asheesh Patel</p>
                <p className="text-[10px] text-slate-400">asheesh.patel@walmart.com</p>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                AP
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
