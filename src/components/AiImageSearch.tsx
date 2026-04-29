'use client';

/* eslint-disable @next/next/no-img-element */

import { useState, useRef } from 'react';
import { NutritionEstimate, NutritionItem } from '@/lib/types';
import MacroBadge from './MacroBadge';

interface AiImageSearchProps {
  onAdd: (item: NutritionItem) => Promise<void>;
}

export default function AiImageSearch({ onAdd }: AiImageSearchProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<NutritionEstimate | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [adding, setAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setEstimate(null);
    setError(null);
    setSelected(new Set());
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  const handleAnalyze = async () => {
    if (!file || loading) return;
    setLoading(true);
    setError(null);
    setEstimate(null);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch('/api/ai/image', { method: 'POST', body: form });
      if (!res.ok) throw new Error();
      const data: NutritionEstimate = await res.json();
      setEstimate(data);
      setSelected(new Set(data.items.map((_, i) => i)));
    } catch {
      setError('Could not analyze the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
  };

  const handleAddSelected = async () => {
    if (!estimate || selected.size === 0 || adding) return;
    setAdding(true);
    for (const i of Array.from(selected)) {
      await onAdd(estimate.items[i]);
    }
    setAdding(false);
    reset();
  };

  const reset = () => {
    setFile(null);
    setEstimate(null);
    setError(null);
    setSelected(new Set());
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Photo of Your Meal</h2>

      {!preview ? (
        <label className="flex flex-col items-center justify-center gap-2 w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-white cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-slate-400">Tap to upload or take a photo</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
            capture="environment"
          />
        </label>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-slate-100">
            <img src={preview} alt="Meal preview" className="w-full max-h-48 object-cover" />
            <button
              onClick={reset}
              className="absolute top-2 right-2 bg-black/40 text-white rounded-full p-1 hover:bg-black/60 transition-colors"
              title="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {!estimate && !loading && !error && (
            <button
              onClick={handleAnalyze}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
            >
              Analyze Photo
            </button>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-2 py-3 text-sm text-slate-500">
              <Spinner />
              Analyzing image...
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
      )}

      {estimate && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-slate-400 px-1">{estimate.description}</p>
          {estimate.items.length === 0 ? (
            <p className="text-sm text-slate-400 px-1">No food items detected.</p>
          ) : (
            <>
              {estimate.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggleItem(i)}
                  className={`w-full flex items-center gap-3 bg-white border rounded-xl px-4 py-2.5 text-left transition-colors ${
                    selected.has(i) ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    selected.has(i) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                  }`}>
                    {selected.has(i) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.servingSize}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <MacroBadge label="P" value={item.protein} />
                      <MacroBadge label="C" value={item.carbs} />
                      <MacroBadge label="F" value={item.fat} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 shrink-0">{item.calories} kcal</span>
                </button>
              ))}
              <button
                onClick={handleAddSelected}
                disabled={selected.size === 0 || adding}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {adding
                  ? <><Spinner /> Adding...</>
                  : `Add ${selected.size} item${selected.size !== 1 ? 's' : ''} to log`}
              </button>
            </>
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
