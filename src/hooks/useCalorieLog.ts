'use client';

import { useState, useEffect, useCallback } from 'react';
import { Food, FoodEntryWithFood, DailyTotals, NutritionItem } from '@/lib/types';

interface CalorieLogState {
  entries: FoodEntryWithFood[];
  totals: DailyTotals;
  allFoods: Food[];
  loading: boolean;
  addEntry: (foodId: number) => Promise<void>;
  addAiEntry: (item: NutritionItem) => Promise<void>;
  deleteEntry: (id: number) => Promise<void>;
}

const emptyTotals: DailyTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

export function useCalorieLog(): CalorieLogState {
  const [entries, setEntries] = useState<FoodEntryWithFood[]>([]);
  const [totals, setTotals] = useState<DailyTotals>(emptyTotals);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    const res = await fetch('/api/entries');
    const data = await res.json();
    setEntries(data.entries);
    setTotals(data.totals);
  }, []);

  const fetchFoods = useCallback(async () => {
    const res = await fetch('/api/foods');
    const data = await res.json();
    setAllFoods(data.foods);
  }, []);

  useEffect(() => {
    Promise.all([fetchEntries(), fetchFoods()]).finally(() => setLoading(false));
  }, [fetchEntries, fetchFoods]);

  const addEntry = useCallback(async (foodId: number) => {
    await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foodId }),
    });
    await fetchEntries();
  }, [fetchEntries]);

  const addAiEntry = useCallback(async (item: NutritionItem) => {
    await fetch('/api/ai/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    await fetchEntries();
  }, [fetchEntries]);

  const deleteEntry = useCallback(async (id: number) => {
    await fetch(`/api/entries/${id}`, { method: 'DELETE' });
    await fetchEntries();
  }, [fetchEntries]);

  return { entries, totals, allFoods, loading, addEntry, addAiEntry, deleteEntry };
}
