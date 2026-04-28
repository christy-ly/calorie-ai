import { DailyTotals } from '@/lib/types';

interface CalorieSummaryProps extends DailyTotals {
  goal?: number;
}

function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 w-4">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-slate-600 w-12 text-right">{Math.round(value)}g</span>
    </div>
  );
}

export default function CalorieSummary({ calories, protein, carbs, fat, goal = 2000 }: CalorieSummaryProps) {
  const pct = Math.min(100, (calories / goal) * 100);
  const barColor = pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500';
  const remaining = Math.max(0, goal - calories);

  return (
    <div className="bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Today</p>
            <p className="text-3xl font-bold text-slate-800 leading-none">
              {Math.round(calories).toLocaleString()}
              <span className="text-base font-normal text-slate-400 ml-1">/ {goal.toLocaleString()} kcal</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-600">{remaining.toLocaleString()} remaining</p>
            <p className="text-xs text-slate-400">{Math.round(pct)}% of goal</p>
          </div>
        </div>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <MacroBar label="P" value={protein} max={150} color="bg-blue-400" />
          <MacroBar label="C" value={carbs} max={250} color="bg-orange-400" />
          <MacroBar label="F" value={fat} max={65} color="bg-yellow-400" />
        </div>
      </div>
    </div>
  );
}
