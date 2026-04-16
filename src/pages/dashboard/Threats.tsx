import React, { useState, useMemo } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import { Search, Shield, TrendingUp, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { formatRelativeTime, getSeverityColor, getCategoryColor } from '../../utils/formatters';
import threatsData from '../../data/threats.json';
import endpointsData from '../../data/endpoints.json';
import { Threat } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subDays } from 'date-fns';

export default function Threats() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7');
  const [showSAOnly, setShowSAOnly] = useState(false);
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null);

  const threats = threatsData as Threat[];

  // Filter threats
  const filteredThreats = useMemo(() => {
    return threats.filter(threat => {
      const matchesSearch =
        threat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.sourceIP.includes(searchQuery) ||
        threat.targetUser.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || threat.category === categoryFilter;
      const matchesSeverity = severityFilter === 'all' || threat.severity === severityFilter;

      const daysAgo = parseInt(dateFilter);
      const cutoffDate = subDays(new Date(), daysAgo);
      const matchesDate = new Date(threat.detectedAt) >= cutoffDate;

      const matchesSA = !showSAOnly || threat.africanSignature;

      return matchesSearch && matchesCategory && matchesSeverity && matchesDate && matchesSA;
    });
  }, [threats, searchQuery, categoryFilter, severityFilter, dateFilter, showSAOnly]);

  // Calculate summary stats
  const totalThreats = filteredThreats.length;
  const africanThreats = filteredThreats.filter(t => t.africanSignature).length;
  const africanPercentage = totalThreats > 0 ? Math.round((africanThreats / totalThreats) * 100) : 0;
  const avgConfidence = totalThreats > 0
    ? Math.round(filteredThreats.reduce((sum, t) => sum + t.confidence, 0) / totalThreats)
    : 0;

  // Severity trend data
  const severityTrendData = useMemo(() => {
    const data: Array<{ date: string; critical: number; high: number; medium: number }> = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');

      const dayThreats = threats.filter(t =>
        format(new Date(t.detectedAt), 'yyyy-MM-dd') === dateStr
      );

      data.push({
        date: format(date, 'MMM dd'),
        critical: dayThreats.filter(t => t.severity === 'critical').length,
        high: dayThreats.filter(t => t.severity === 'high').length,
        medium: dayThreats.filter(t => t.severity === 'medium').length,
      });
    }

    return data;
  }, [threats]);

  const getCountryFlag = (code: string) => {
    const flags: Record<string, string> = {
      ZA: '🇿🇦',
      NG: '🇳🇬',
      US: '🇺🇸',
      DE: '🇩🇪',
      NL: '🇳🇱',
      RU: '🇷🇺',
      UA: '🇺🇦',
    };
    return flags[code] || '🌍';
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-700 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-sm text-gray-300 mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AppLayout title="Threat Intelligence">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-shield-blue" />
              <h3 className="text-sm font-medium text-gray-400">Total Threats</h3>
            </div>
            <p className="text-3xl font-bold text-white">{totalThreats}</p>
            <p className="text-xs text-gray-500 mt-1">Last {dateFilter} days</p>
          </div>

          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-amber-500" />
              <h3 className="text-sm font-medium text-gray-400">African-Signature Threats</h3>
            </div>
            <p className="text-3xl font-bold text-white">{africanPercentage}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {africanThreats} of {totalThreats} were SA-specific
            </p>
          </div>

          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h3 className="text-sm font-medium text-gray-400">Avg. Confidence Score</h3>
            </div>
            <p className="text-3xl font-bold text-white">{avgConfidence}%</p>
            <p className="text-xs text-gray-500 mt-1">High accuracy detection</p>
          </div>
        </div>

        {/* AfricaCERT Banner */}
        <div className="bg-gradient-to-r from-shield-blue/10 to-purple-600/10 border border-shield-blue/30 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-shield-blue/20 rounded-lg">
              <Shield className="h-8 w-8 text-shield-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-3">
                AfricaCERT & CSIRT.ZA Intelligence
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                ShieldAI threat detection is powered by <span className="text-shield-blue font-semibold">AfricaCERT</span> and{' '}
                <span className="text-shield-blue font-semibold">CSIRT.ZA</span> — the only SA-native threat intelligence feeds.
                Global competitors use US/EU training data, meaning local threats like ABSA phishing kits and Eskom
                ransomware lures are detected up to <span className="text-green-400 font-semibold">4x faster</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-300">Live feed active</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-700 rounded-lg">
                  <span className="text-sm text-gray-300">Last update: 4 hours ago</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-700 rounded-lg">
                  <span className="text-sm text-gray-300">12 new signatures</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search threats, IP, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="phishing">Phishing</option>
                <option value="ransomware">Ransomware</option>
                <option value="malware">Malware</option>
                <option value="trojan">Trojan</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full px-4 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
              >
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </div>
          </div>

          {/* SA Filter Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saOnly"
              checked={showSAOnly}
              onChange={(e) => setShowSAOnly(e.target.checked)}
              className="h-4 w-4 rounded border-gray-600 bg-navy-600 text-shield-blue focus:ring-2 focus:ring-shield-blue"
            />
            <label htmlFor="saOnly" className="text-sm text-gray-300 cursor-pointer">
              Show SA-signature threats only
            </label>
          </div>

          <div className="mt-3 text-sm text-gray-400">
            Showing {filteredThreats.length} of {threats.length} threats
          </div>
        </div>

        {/* Threats Table */}
        <div className="bg-navy-700 border border-gray-700/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-600 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Threat Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Detected
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredThreats.map((threat, index) => (
                  <React.Fragment key={threat.id}>
                    <tr
                      className="hover:bg-navy-600/50 transition-colors cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 20}ms` }}
                      onClick={() => setExpandedThreat(expandedThreat === threat.id ? null : threat.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white max-w-xs truncate">{threat.name}</p>
                          {threat.africanSignature && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-shield-blue/20 text-shield-blue border border-shield-blue/30">
                              SA
                            </span>
                          )}
                          {expandedThreat === threat.id ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(threat.category)}`}>
                          {threat.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                          {threat.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getCountryFlag(threat.sourceCountry)}</span>
                          <span className="text-sm text-gray-300 font-mono">{threat.sourceIP}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-white">{threat.targetUser}</p>
                          <p className="text-xs text-gray-400">
                            {endpointsData.find((e: any) => e.id === threat.targetEndpoint)?.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={threat.action as any} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-shield-blue h-2 rounded-full"
                              style={{ width: `${threat.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-300">{threat.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatRelativeTime(threat.detectedAt)}
                      </td>
                    </tr>
                    {expandedThreat === threat.id && (
                      <tr className="bg-navy-600/30">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="max-w-3xl">
                            <h4 className="text-sm font-semibold text-white mb-2">Description</h4>
                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                              {threat.description}
                            </p>
                            <div className="flex gap-4 text-xs">
                              <div>
                                <span className="text-gray-400">Detected at:</span>
                                <span className="text-white ml-2">{new Date(threat.detectedAt).toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Threat ID:</span>
                                <span className="text-white ml-2 font-mono">{threat.id}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Severity Trends Chart */}
        <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Severity Trends — Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={severityTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }} />
              <Bar dataKey="critical" fill="#EF4444" name="Critical" radius={[4, 4, 0, 0]} />
              <Bar dataKey="high" fill="#F59E0B" name="High" radius={[4, 4, 0, 0]} />
              <Bar dataKey="medium" fill="#FBBF24" name="Medium" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}
