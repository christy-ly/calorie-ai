import { Food } from '@/lib/types';
import MacroBadge from './MacroBadge';

interface FoodCardProps {
  food: Food;
  onAdd: (food: Food) => void;
  variant?: 'grid' | 'compact';
}

export default function FoodCard({ food, onAdd, variant = 'grid' }: FoodCardProps) {
  if (variant === 'compact') {
    return (
      <button
        onClick={() => onAdd(food)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
      >
        <div>
          <p className="text-sm font-medium text-slate-800">{food.name}</p>
          <p className="text-xs text-slate-500">{food.servingSize}</p>
        </div>
        <span className="text-sm font-semibold text-emerald-600 ml-4">{food.calories} kcal</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onAdd(food)}
      className="group flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-150 text-left"
    >
      <p className="text-sm font-semibold text-slate-800 leading-tight">{food.name}</p>
      <p className="text-xs text-slate-400">{food.servingSize}</p>
      <p className="text-lg font-bold text-emerald-600">{food.calories}</p>
      <p className="text-xs text-slate-400 -mt-1">kcal</p>
      <div className="flex flex-wrap gap-1 mt-0.5">
        <MacroBadge label="P" value={food.protein} />
        <MacroBadge label="C" value={food.carbs} />
        <MacroBadge label="F" value={food.fat} />
      </div>
    </button>
  );
}
