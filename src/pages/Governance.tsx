import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText,
  User,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { MOCK_ACCESS_REQUESTS, MOCK_DATASETS } from '../mockData';

const Governance: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Data Governance</h2>
          <p className="text-slate-500 text-sm">Manage dataset access requests and audit usage policies</p>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm">
          <ShieldCheck size={18} />
          New Access Request
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Requests', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Approved (30d)', value: '145', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Rejected (30d)', value: '8', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Active Policies', value: '24', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Request Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Access Request Queue</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search requests..." 
                className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">Dataset / Table</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Requester</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Submitted</th>
                <th className="px-6 py-4 font-semibold text-slate-600">SLA Due</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ACCESS_REQUESTS.map((req) => {
                const ds = MOCK_DATASETS.find(d => d.id === req.datasetId);
                return (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-slate-400">
                          <FileText size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{ds?.name || 'Unknown Dataset'}</p>
                          <p className="text-[10px] text-slate-400">{ds?.project}.{ds?.dataset}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px] font-bold">
                          {req.requester.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-slate-600 font-medium">{req.requester}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{req.submittedAt}</td>
                    <td className="px-6 py-4 text-slate-500">{req.expectedResponse}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                        req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                        req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1 ml-auto">
                        Review <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Governance Policies */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Active Data Guardrails</h3>
          <div className="space-y-3">
            {[
              { title: 'PII Masking', desc: 'Automatic masking of emails and phone numbers in dev projects.', status: 'Active' },
              { title: 'Cost Threshold', desc: 'Alerts triggered for queries exceeding $50.00 estimated cost.', status: 'Active' },
              { title: 'Data Retention', desc: 'Temporary tables are automatically purged after 30 days.', status: 'Active' },
            ].map((policy, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <ShieldCheck size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{policy.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{policy.desc}</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-emerald-600 uppercase">{policy.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Recent Audit Logs</h3>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'Accessed sensitive table', time: '10 mins ago' },
              { user: 'Jane Smith', action: 'Approved MRAM pipeline', time: '1 hour ago' },
              { user: 'System', action: 'Purged 12 temporary tables', time: '3 hours ago' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <span className="font-medium text-slate-700">{log.user}</span>
                  <span className="text-slate-400">{log.action}</span>
                </div>
                <span className="text-slate-400">{log.time}</span>
              </div>
            ))}
            <button className="w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              View Full Audit Trail
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Governance;
