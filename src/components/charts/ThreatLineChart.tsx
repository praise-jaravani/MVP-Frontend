import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Threat } from '../../types';
import { format, subDays } from 'date-fns';

interface ThreatLineChartProps {
  threats: Threat[];
  days?: number;
}

export default function ThreatLineChart({ threats, days = 7 }: ThreatLineChartProps) {
  const chartData = useMemo(() => {
    const data: Array<{ date: string; detected: number; blocked: number }> = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');

      const dayThreats = threats.filter(t =>
        format(new Date(t.detectedAt), 'yyyy-MM-dd') === dateStr
      );

      const blocked = dayThreats.filter(t =>
        t.action === 'blocked' || t.action === 'quarantined'
      ).length;

      data.push({
        date: format(date, 'MMM dd'),
        detected: dayThreats.length,
        blocked,
      });
    }

    return data;
  }, [threats, days]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-700 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm text-gray-300 mb-2">{payload[0].payload.date}</p>
          <p className="text-sm text-shield-blue">
            Detected: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-sm text-green-500">
            Blocked: <span className="font-semibold">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}
        />
        <Line
          type="monotone"
          dataKey="detected"
          stroke="#2D7EF8"
          strokeWidth={2}
          dot={{ fill: '#2D7EF8', r: 4 }}
          name="Threats Detected"
        />
        <Line
          type="monotone"
          dataKey="blocked"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ fill: '#10B981', r: 4 }}
          name="Threats Blocked"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
