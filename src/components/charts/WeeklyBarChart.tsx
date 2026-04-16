import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Threat } from '../../types';
import { format, subDays } from 'date-fns';

interface WeeklyBarChartProps {
  threats: Threat[];
  endpointId?: string;
}

export default function WeeklyBarChart({ threats, endpointId }: WeeklyBarChartProps) {
  const chartData = useMemo(() => {
    const data: Array<{ date: string; count: number }> = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');

      let dayThreats = threats.filter(t =>
        format(new Date(t.detectedAt), 'yyyy-MM-dd') === dateStr
      );

      if (endpointId) {
        dayThreats = dayThreats.filter(t => t.targetEndpoint === endpointId);
      }

      data.push({
        date: format(date, 'EEE'),
        count: dayThreats.length,
      });
    }

    return data;
  }, [threats, endpointId]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-700 border border-gray-600 rounded-lg p-2 shadow-xl">
          <p className="text-xs text-gray-100">
            {payload[0].value} threat{payload[0].value !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          stroke="#9CA3AF"
          style={{ fontSize: '11px' }}
        />
        <YAxis
          stroke="#9CA3AF"
          style={{ fontSize: '11px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="count"
          fill="#2D7EF8"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
