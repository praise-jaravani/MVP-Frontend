
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subLabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: 'blue' | 'green' | 'red' | 'teal';
}

export default function MetricCard({ title, value, subLabel, trend, accentColor = 'blue' }: MetricCardProps) {
  const colors: Record<string, string> = {
    blue: 'border-t-shield-blue',
    green: 'border-t-green-500',
    red: 'border-t-red-500',
    teal: 'border-t-cyan-500',
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className={`bg-navy-700 border border-gray-700/50 rounded-lg p-5 ${colors[accentColor]} border-t-2 card-hover animate-fade-in`}>
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-100">{value}</p>
          {subLabel && (
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              {getTrendIcon()}
              {subLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
