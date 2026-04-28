'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Food } from '@/lib/types';
import FoodCard from './FoodCard';

interface SearchBarProps {
  onAdd: (food: Food) => void;
}

export default function SearchBar({ onAdd }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Food[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setOpen(false); return; }
    const res = await fetch(`/api/foods?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResults(data.foods);
    setOpen(true);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, search]);

  const handleAdd = (food: Food) => {
    onAdd(food);
    setQuery('');
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, -1)); }
    if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); handleAdd(results[activeIndex]); }
    if (e.key === 'Escape') { setOpen(false); setActiveIndex(-1); }
  };

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Search Foods</h2>
      <div className="relative">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (results.length > 0) setOpen(true); }}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search for a food..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
          />
        </div>

        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            {results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400">No results found</p>
            ) : (
              <ul>
                {results.slice(0, 8).map((food, i) => (
                  <li key={food.id ?? food.name} className={activeIndex === i ? 'bg-slate-50' : ''}>
                    <FoodCard food={food} onAdd={handleAdd} variant="compact" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
