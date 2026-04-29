'use client';

import { useState } from 'react';
import { useCalorieLog } from '@/hooks/useCalorieLog';
import { Food, NutritionItem } from '@/lib/types';
import CalorieSummary from '@/components/CalorieSummary';
import SearchBar from '@/components/SearchBar';
import QuickAddGrid from '@/components/QuickAddGrid';
import DailyLog from '@/components/DailyLog';
import AiTextSearch from '@/components/AiTextSearch';
import AiImageSearch from '@/components/AiImageSearch';

type Tab = 'search' | 'text' | 'photo';

const QUICK_ADD_COUNT = 12;

const TAB_LABELS: Record<Tab, string> = {
  search: 'Search',
  text: 'AI Text',
  photo: 'AI Photo',
};

export default function Home() {
  const { entries, totals, allFoods, loading, addEntry, addAiEntry, deleteEntry } = useCalorieLog();
  const [tab, setTab] = useState<Tab>('search');

  const quickAddFoods = allFoods.slice(0, QUICK_ADD_COUNT);

  const handleAdd = (food: Food) => addEntry(food.id);
  const handleAiAdd = (item: NutritionItem) => addAiEntry(item);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20">
        <div className="bg-white border-b border-slate-100 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥗</span>
              <h1 className="text-lg font-bold text-slate-800">Calorie AI</h1>
            </div>
          </div>
        </div>
        <CalorieSummary {...totals} />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    tab === t
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {TAB_LABELS[t]}
                </button>
              ))}
            </div>

            {tab === 'search' && <SearchBar onAdd={handleAdd} />}
            {tab === 'text' && <AiTextSearch onAdd={handleAiAdd} />}
            {tab === 'photo' && <AiImageSearch onAdd={handleAiAdd} />}

            <QuickAddGrid foods={quickAddFoods} onAdd={handleAdd} />
          </div>
          <div>
            <DailyLog entries={entries} onDelete={deleteEntry} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
