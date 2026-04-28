'use client';

import { useCalorieLog } from '@/hooks/useCalorieLog';
import { Food } from '@/lib/types';
import CalorieSummary from '@/components/CalorieSummary';
import SearchBar from '@/components/SearchBar';
import QuickAddGrid from '@/components/QuickAddGrid';
import DailyLog from '@/components/DailyLog';

const QUICK_ADD_COUNT = 12;

export default function Home() {
  const { entries, totals, allFoods, loading, addEntry, deleteEntry } = useCalorieLog();

  const quickAddFoods = allFoods.slice(0, QUICK_ADD_COUNT);

  const handleAdd = (food: Food) => addEntry(food.id);

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
            <SearchBar onAdd={handleAdd} />
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
