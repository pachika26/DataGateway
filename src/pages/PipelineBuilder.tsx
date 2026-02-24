import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Save, 
  ChevronLeft, 
  Database, 
  Plus,
  GitBranch,
  Code2,
  Terminal,
  Cpu,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';

const PipelineBuilder: React.FC = () => {
  const { currentProject, datasets, adHocPinnedIds } = useApp();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const activePinnedIds = currentProject ? currentProject.pinnedDatasetIds : adHocPinnedIds;
  const pinnedDatasets = datasets.filter(ds => activePinnedIds.includes(ds.id));

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowGraph(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {currentProject ? `${currentProject.name} Pipeline` : 'Ad-hoc Pipeline Builder'}
          </h2>
          <p className="text-slate-500 text-sm">Design and build your data workflow using AI assistance</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            <ChevronLeft size={16} />
            Back
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
            <Save size={16} />
            {currentProject ? 'Save Pipeline' : 'Save as Project'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left: AI Chat & Pinned Data */}
        <aside className="w-96 flex flex-col gap-6 shrink-0">
          {/* Pinned Datasets Card */}
          <div className={`p-6 rounded-xl border space-y-4 transition-all ${
            !currentProject ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Database size={16} className={!currentProject ? 'text-amber-600' : 'text-blue-500'} />
                {currentProject ? 'Pinned Datasets' : 'Ad-hoc Selections'}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                !currentProject ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'
              }`}>
                {pinnedDatasets.length}
              </span>
            </div>
            <div className="space-y-2">
              {pinnedDatasets.map(ds => (
                <div key={ds.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 group cursor-pointer hover:border-blue-300 transition-all">
                  <p className="text-xs font-bold text-slate-900">{ds.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1 truncate">{ds.description}</p>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-[10px] font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                <Plus size={12} />
                Add more from catalog
              </button>
            </div>
          </div>

          {/* AI Prompt Card */}
          <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sparkles size={18} className="text-indigo-500" />
              AI Pipeline Assistant
            </div>
            <div className="flex-1 bg-slate-50 rounded-lg p-4 overflow-y-auto space-y-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed shadow-sm">
                Hello! I can help you build a pipeline using your pinned datasets. What would you like to create?
              </div>
              {showGraph && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-700 leading-relaxed shadow-sm">
                  I've analyzed your request and suggested adding a "Data Transformation" task to your pipeline.
                  <button className="mt-2 text-blue-600 font-bold hover:underline block">+ Add: Data Transformation</button>
                </div>
              )}
            </div>
            <div className="relative">
              <textarea 
                placeholder="e.g., Join transactions with campaign data to calculate daily ROI..."
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none h-32"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <ArrowRight size={20} />
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Right: Canvas / Graph */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden relative">
          {!showGraph ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <GitBranch size={40} />
              </div>
              <div className="max-w-md">
                <h4 className="text-lg font-bold text-slate-900">Your Canvas is Empty</h4>
                <p className="text-sm text-slate-500 mt-2">
                  Use the AI assistant on the left to describe your workflow, or drag and drop datasets to start building manually.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Canvas Toolbar */}
              <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-4 shrink-0">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Terminal size={16} /></button>
                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Code2 size={16} /></button>
                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Cpu size={16} /></button>
                </div>
                <div className="h-4 w-px bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> Governance: Valid</div>
                  <div className="flex items-center gap-1.5"><DollarSign size={14} className="text-blue-500" /> Est. Cost: $0.45/run</div>
                </div>
              </div>

              {/* The "Graph" */}
              <div className="flex-1 bg-slate-50/50 relative overflow-hidden p-8">
                {/* Simple Mock Graph Nodes */}
                <div className="flex items-center justify-center h-full gap-12">
                  <div className="w-48 p-4 bg-white rounded-xl border-2 border-blue-500 shadow-lg space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-600 uppercase">Extract</span>
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    </div>
                    <p className="text-xs font-bold text-slate-900">customer_transactions</p>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>
                  </div>

                  <div className="w-12 h-0.5 bg-blue-200"></div>

                  <div className="w-48 p-4 bg-white rounded-xl border border-slate-200 shadow-md space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">Transform</span>
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-xs font-bold text-slate-900">Join & Aggregate</p>
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-full border-4 border-white"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-full border-4 border-white"></div>
                  </div>

                  <div className="w-12 h-0.5 bg-slate-200"></div>

                  <div className="w-48 p-4 bg-white rounded-xl border border-slate-200 shadow-md space-y-3 relative opacity-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Load</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">MRAM_Final_Table</p>
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-full border-4 border-white"></div>
                  </div>
                </div>
              </div>

              {/* Code Editor / Details Panel */}
              <div className="h-64 border-t border-slate-200 bg-[#0F172A] text-white flex flex-col shrink-0">
                <div className="h-10 border-b border-slate-800 flex items-center px-4 justify-between">
                  <div className="flex gap-4">
                    <button className="text-[10px] font-bold uppercase tracking-wider text-blue-400 border-b-2 border-blue-400 h-full px-2">SQL Editor</button>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 h-full px-2">Python</button>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 h-full px-2">Config</button>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold flex items-center gap-1.5">
                      <Play size={12} /> Test Run
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 font-mono text-xs text-blue-300 overflow-y-auto">
                  <pre>
{`SELECT 
  t.customer_id,
  t.transaction_date,
  SUM(t.amount) as daily_spend,
  c.campaign_name
FROM \`ecommerce-prod.customers.transactions\` t
JOIN \`marketing-prod.campaigns.metadata\` c ON t.customer_id = c.account_id
GROUP BY 1, 2, 4
LIMIT 1000`}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* Cost Guardrail Overlay */}
          {showGraph && (
            <div className="absolute bottom-72 right-6 p-4 bg-white rounded-xl border border-slate-200 shadow-xl max-w-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <AlertTriangle size={16} className="text-amber-500" />
                Cost Optimization Tip
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                This query scans 4.2GB. By adding a partition filter on <code className="bg-slate-100 px-1 rounded">transaction_date</code>, you can reduce scan to 120MB and save ~$0.30 per run.
              </p>
              <button className="w-full py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded hover:bg-blue-100 transition-colors">
                Apply Optimization
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PipelineBuilder;
