'use client';

import { useState } from 'react';
import { NutritionEstimate, NutritionItem } from '@/lib/types';
import MacroBadge from './MacroBadge';

interface AiTextSearchProps {
  onAdd: (item: NutritionItem) => Promise<void>;
}

export default function AiTextSearch({ onAdd }: AiTextSearchProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<NutritionEstimate | null>(null);
  const [adding, setAdding] = useState<Set<number>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    setError(null);
    setEstimate(null);
    try {
      const res = await fetch('/api/ai/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: query.trim() }),
      });
      if (!res.ok) throw new Error();
      setEstimate(await res.json());
    } catch {
      setError('Could not get nutrition data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (item: NutritionItem, index: number) => {
    setAdding((prev) => new Set(prev).add(index));
    await onAdd(item);
    setAdding((prev) => { const next = new Set(prev); next.delete(index); return next; });
  };

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Describe Your Meal</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. smoked beef with salad"
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? <Spinner /> : 'Analyze'}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
      )}

      {estimate && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-slate-400 px-1">{estimate.description}</p>
          {estimate.items.length === 0 ? (
            <p className="text-sm text-slate-400 px-1">No food items identified.</p>
          ) : (
            estimate.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.servingSize}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <MacroBadge label="P" value={item.protein} />
                    <MacroBadge label="C" value={item.carbs} />
                    <MacroBadge label="F" value={item.fat} />
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-emerald-600">{item.calories} kcal</span>
                  <button
                    onClick={() => handleAdd(item, i)}
                    disabled={adding.has(i)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 disabled:opacity-50 transition-colors min-w-[52px]"
                  >
                    {adding.has(i) ? '...' : '+ Add'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
