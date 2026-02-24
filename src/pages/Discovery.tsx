import React, { useState } from 'react';
import { 
  Search, 
  Pin, 
  Eye, 
  CheckCircle, 
  Info,
  ChevronRight,
  Database,
  User,
  Calendar,
  Layers,
  X,
  Save
} from 'lucide-react';
import { useApp } from '../AppContext';
import { Dataset } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const Discovery: React.FC = () => {
  const { datasets, currentProject, adHocPinnedIds, pinDataset, unpinDataset } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const filteredDatasets = datasets.filter(ds => 
    ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ds.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePinnedIds = currentProject ? currentProject.pinnedDatasetIds : adHocPinnedIds;
  const isPinned = (id: string) => activePinnedIds.includes(id);

  return (
    <div className="flex gap-8 h-full">
      {/* Left Sidebar: Search & Filters */}
      <aside className="w-80 shrink-0 space-y-6">
        <div className={`p-6 rounded-xl border space-y-4 transition-all ${
          !currentProject ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              {currentProject ? 'Pinned Tables' : 'Ad-hoc Selections'}
            </h3>
            {!currentProject && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Ad-hoc</span>
            )}
          </div>
          <div className="space-y-2">
            {activePinnedIds.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No tables selected yet.</p>
            ) : (
              activePinnedIds.map(id => {
                const ds = datasets.find(d => d.id === id);
                return ds ? (
                  <div key={id} className={`flex items-center justify-between p-2 rounded-lg border ${
                    !currentProject ? 'bg-white border-amber-200' : 'bg-blue-50 border-blue-100'
                  }`}>
                    <span className={`text-xs font-medium truncate ${!currentProject ? 'text-amber-800' : 'text-blue-700'}`}>{ds.name}</span>
                    <button 
                      onClick={() => unpinDataset(id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })
            )}
          </div>
          {activePinnedIds.length > 0 && !currentProject && (
            <button className="w-full py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
              <Save size={14} />
              Save as Project
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Search History</h3>
          <div className="space-y-3">
            {['transactions', 'customer data', 'marketing spend'].map((term, i) => (
              <button key={i} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                <Search size={12} />
                {term}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content: Catalog */}
      <div className="flex-1 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Data Catalog</h2>
            <p className="text-slate-500 text-sm">Search and explore tables from your data catalogue</p>
          </div>
        </header>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search tables, columns, descriptions..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Found {filteredDatasets.length} table(s)</p>
          
          {filteredDatasets.map((ds) => (
            <div key={ds.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ds.name}</h4>
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                  <p className="text-sm text-slate-500 max-w-2xl">{ds.description}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => isPinned(ds.id) ? unpinDataset(ds.id) : pinDataset(ds.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      isPinned(ds.id) 
                        ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Pin size={14} className={isPinned(ds.id) ? 'fill-amber-700' : ''} />
                    {isPinned(ds.id) ? 'Pinned' : 'Pin'}
                  </button>
                  <button 
                    onClick={() => setSelectedDataset(ds)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all"
                  >
                    <Eye size={14} />
                    Preview
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Project ID</p>
                  <p className="text-xs font-medium text-slate-700">{ds.project}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Dataset ID</p>
                  <p className="text-xs font-medium text-slate-700">{ds.dataset}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Table ID</p>
                  <p className="text-xs font-medium text-slate-700">{ds.table}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Data Classification</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    ds.classification === 'sensitive' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {ds.classification}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Preview Modal */}
      <AnimatePresence>
        {selectedDataset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-5xl max-h-full rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <header className="p-6 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">{selectedDataset.name}</h3>
                  <CheckCircle size={20} className="text-emerald-500" />
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    selectedDataset.classification === 'sensitive' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {selectedDataset.classification}
                  </span>
                </div>
                <button onClick={() => setSelectedDataset(null)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Summary</h4>
                    <p className="text-slate-600 leading-relaxed">{selectedDataset.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Columns</p>
                        <p className="text-xl font-bold">{selectedDataset.columns.length}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Rows</p>
                        <p className="text-xl font-bold">{selectedDataset.rowCount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Metadata</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <User size={16} className="text-slate-400" />
                        <span className="text-slate-500">Owner:</span>
                        <span className="font-medium">{selectedDataset.owner}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-slate-500">Last Refresh:</span>
                        <span className="font-medium">{selectedDataset.lastRefresh}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Database size={16} className="text-slate-400" />
                        <span className="text-slate-500">Source:</span>
                        <span className="font-medium">BigQuery</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Column Types</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {selectedDataset.columns.map((col, i) => (
                      <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg">
                        <p className="text-xs font-bold text-slate-900 truncate">{col.name}</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase mt-1">{col.type}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Sample Data Preview</h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          {selectedDataset.columns.map((col, i) => (
                            <th key={i} className="px-4 py-3 font-bold text-slate-600">{col.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3, 4, 5].map((_, ri) => (
                          <tr key={ri}>
                            {selectedDataset.columns.map((col, ci) => (
                              <td key={ci} className="px-4 py-3 text-slate-500">
                                {col.type === 'DATE' ? '2024-02-24' : col.type === 'FLOAT' ? '124.50' : `sample_${ri}`}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <footer className="p-6 border-t border-slate-200 flex justify-end gap-3 shrink-0">
                <button 
                  onClick={() => setSelectedDataset(null)}
                  className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    isPinned(selectedDataset.id) ? unpinDataset(selectedDataset.id) : pinDataset(selectedDataset.id);
                  }}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    isPinned(selectedDataset.id)
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isPinned(selectedDataset.id) ? 'Unpin from Project' : 'Pin to Project'}
                </button>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Discovery;
