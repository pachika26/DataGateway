import React from 'react';
import { 
  Plus, 
  Search, 
  Lock, 
  FileText, 
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../AppContext';
import { MOCK_PIPELINES, MOCK_ACCESS_REQUESTS } from '../mockData';

const Home: React.FC = () => {
  const { currentProject, setCurrentProject } = useApp();

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome to Data Gateway</h2>
          <p className="text-slate-500 mt-1">Your centralized platform to discover, explore, and build production-ready, cost-aware data pipelines.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setCurrentProject(null)}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <Sparkles size={18} className="text-amber-500" />
            Ad-hoc Task
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm">
            <Plus size={18} />
            Create Project
          </button>
        </div>
      </header>

      {currentProject ? (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              {currentProject.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Active Project</p>
              <h3 className="text-lg font-bold text-slate-900">{currentProject.name}</h3>
            </div>
          </div>
          <button 
            onClick={() => setCurrentProject(null)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Switch to Ad-hoc Mode
          </button>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Current Mode</p>
              <h3 className="text-lg font-bold text-slate-900">Ad-hoc Workspace</h3>
            </div>
          </div>
          <p className="text-sm text-amber-700 max-w-md text-right">
            You are in ad-hoc mode. Your selections will not be saved to a project unless you choose to save them later.
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Build New Pipeline', icon: Plus, color: 'bg-indigo-50' },
            { label: 'Discover Data Tables', icon: Search, color: 'bg-blue-50' },
            { label: 'Request Data Access', icon: Lock, color: 'bg-amber-50' },
            { label: 'Manage Access Requests', icon: FileText, color: 'bg-emerald-50' },
            { label: 'Help & Resources', icon: HelpCircle, color: 'bg-rose-50' },
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group">
              <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon size={20} className="text-slate-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Pipelines */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your Recent Pipelines</h3>
            <button className="text-xs font-medium text-blue-600 hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-slate-600">Pipeline Name</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Team / Owner</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Last Run</th>
                  <th className="px-6 py-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_PIPELINES.map((pipe) => (
                  <tr key={pipe.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium">{pipe.name}</td>
                    <td className="px-6 py-4 text-slate-500">You</td>
                    <td className="px-6 py-4 text-slate-500">{pipe.lastRun}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                        pipe.status === 'production' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {pipe.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Quick Stats</h3>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Pipelines</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">Success Rate</span>
                <span className="text-emerald-600">94%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Access Requests</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                  <Clock size={20} />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Pending approval</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Access Requests */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your Pending Access Requests</h3>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-600">Request Type</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Submitted</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Expected Response</th>
                <th className="px-6 py-3 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ACCESS_REQUESTS.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium">Data Access Request</td>
                  <td className="px-6 py-4 text-slate-500">{req.submittedAt}</td>
                  <td className="px-6 py-4 text-slate-500">{req.expectedResponse}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                      req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {req.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Home;
