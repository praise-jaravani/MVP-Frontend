import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Threat } from '../../types';

interface ThreatDonutChartProps {
  threats: Threat[];
}

const COLORS = {
  phishing: '#2D7EF8',
  ransomware: '#EF4444',
  malware: '#F59E0B',
  trojan: '#06B6D4',
};

export default function ThreatDonutChart({ threats }: ThreatDonutChartProps) {
  const chartData = useMemo(() => {
    const categories = threats.reduce((acc, threat) => {
      acc[threat.category] = (acc[threat.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: COLORS[name as keyof typeof COLORS] || '#8A9BB8',
    }));
  }, [threats]);

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-navy-700 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm text-gray-100 font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-400">
            {payload[0].value} threats ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <div className="relative h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label - Now properly positioned within the chart */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{total}</p>
            <p className="text-xs text-gray-400">Total Threats</p>
          </div>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-300">
              {entry.name} <span className="text-gray-500">({entry.value})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
