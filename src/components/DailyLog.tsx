import { FoodEntryWithFood } from '@/lib/types';
import LogEntry from './LogEntry';

interface DailyLogProps {
  entries: FoodEntryWithFood[];
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function DailyLog({ entries, onDelete, loading }: DailyLogProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <section>
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
        {today}
      </h2>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm font-medium">No food logged yet</p>
          <p className="text-xs mt-1">Add something using the search or quick-add above</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <LogEntry key={entry.id} entry={entry} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
