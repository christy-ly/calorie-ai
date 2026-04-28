import { Food } from '@/lib/types';
import FoodCard from './FoodCard';

interface QuickAddGridProps {
  foods: Food[];
  onAdd: (food: Food) => void;
}

export default function QuickAddGrid({ foods, onAdd }: QuickAddGridProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Quick Add</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} onAdd={onAdd} variant="grid" />
        ))}
      </div>
    </section>
  );
}
