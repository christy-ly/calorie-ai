import { FoodEntryWithFood } from '@/lib/types';
import MacroBadge from './MacroBadge';

interface LogEntryProps {
  entry: FoodEntryWithFood;
  onDelete: (id: number) => void;
}

export default function LogEntry({ entry, onDelete }: LogEntryProps) {
  const { food, quantity } = entry;
  const cal = Math.round(food.calories * quantity);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-semibold text-slate-800 truncate">{food.name}</p>
          {quantity !== 1 && (
            <span className="text-xs text-slate-400">x{quantity}</span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{food.servingSize}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          <MacroBadge label="P" value={food.protein * quantity} />
          <MacroBadge label="C" value={food.carbs * quantity} />
          <MacroBadge label="F" value={food.fat * quantity} />
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-base font-bold text-slate-700">{cal} <span className="text-xs font-normal text-slate-400">kcal</span></span>
        <button
          onClick={() => onDelete(entry.id)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
          aria-label="Remove entry"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
