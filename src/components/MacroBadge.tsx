interface MacroBadgeProps {
  label: 'P' | 'C' | 'F';
  value: number;
}

const colors = {
  P: 'bg-blue-100 text-blue-700',
  C: 'bg-orange-100 text-orange-700',
  F: 'bg-yellow-100 text-yellow-700',
};

export default function MacroBadge({ label, value }: MacroBadgeProps) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${colors[label]}`}>
      {label} {Math.round(value)}g
    </span>
  );
}
