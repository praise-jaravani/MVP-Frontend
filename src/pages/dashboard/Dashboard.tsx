import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import MetricCard from '../../components/ui/MetricCard';
import ThreatFeedItem from '../../components/ui/ThreatFeedItem';
import ThreatLineChart from '../../components/charts/ThreatLineChart';
import ThreatDonutChart from '../../components/charts/ThreatDonutChart';
import { Shield, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import endpointsData from '../../data/endpoints.json';
import threatsData from '../../data/threats.json';
import alertsData from '../../data/alerts.json';
import threatFeedData from '../../data/threatFeed.json';
import { Threat, Endpoint, Alert, ThreatFeedItem as ThreatFeedType } from '../../types';

export default function Dashboard() {
  const [threatFeed, setThreatFeed] = useState<ThreatFeedType[]>(threatFeedData.slice(0, 10));
  const [currentFeedIndex, setCurrentFeedIndex] = useState(10);

  const endpoints = endpointsData as Endpoint[];
  const threats = threatsData as Threat[];
  const alerts = alertsData as Alert[];

  // Calculate metrics
  const protectedEndpoints = endpoints.filter(e => e.status === 'protected').length;
  const totalEndpoints = endpoints.length;
  const needsAttention = endpoints.filter(e => e.status !== 'protected').length;

  const today = new Date().toISOString().split('T')[0];
  const threatsToday = threats.filter(t => t.detectedAt.startsWith(today)).length;

  const activeAlerts = alerts.filter(a => !a.read).length;
  const criticalAlerts = alerts.filter(a => a.type === 'critical' && !a.read).length;

  const avgHealth = Math.round(
    endpoints.reduce((sum, e) => sum + e.healthScore, 0) / endpoints.length
  );

  // Live threat feed simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentFeedIndex < threatFeedData.length) {
        setThreatFeed(prev => [threatFeedData[currentFeedIndex], ...prev.slice(0, 9)]);
        setCurrentFeedIndex(prev => prev + 1);
      } else {
        setCurrentFeedIndex(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentFeedIndex]);

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Endpoints Protected"
            value={`${protectedEndpoints}/${totalEndpoints}`}
            subLabel={`${needsAttention} need attention`}
            accentColor="blue"
          />
          <MetricCard
            title="Threats Blocked Today"
            value={threatsToday}
            subLabel="↑ 4 from yesterday"
            trend="up"
            accentColor="green"
          />
          <MetricCard
            title="Active Alerts"
            value={activeAlerts}
            subLabel={`${criticalAlerts} critical`}
            accentColor="red"
          />
          <MetricCard
            title="System Health"
            value={`${avgHealth}%`}
            subLabel="Last updated 2 min ago"
            accentColor="teal"
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threat Activity Chart */}
          <div className="lg:col-span-2 bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Threat Activity — Last 7 Days</h3>
              <div className="flex gap-2">
                {['7D', '14D', '30D'].map(period => (
                  <button
                    key={period}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      period === '7D'
                        ? 'bg-shield-blue text-white'
                        : 'bg-navy-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ThreatLineChart threats={threats} days={7} />
          </div>

          {/* Live Threat Feed */}
          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Live Threat Feed</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              {threatFeed.map((item, index) => (
                <ThreatFeedItem
                  key={`${item.id}-${index}`}
                  type={item.type}
                  threat={item.threat}
                  endpoint={item.endpoint}
                  ip={item.ip}
                  time={item.time}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Endpoint Status Summary */}
          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Endpoint Status Summary</h3>

            {/* Status Bar */}
            <div className="mb-6">
              <div className="flex h-4 rounded-lg overflow-hidden">
                <div
                  className="bg-green-500"
                  style={{
                    width: `${(protectedEndpoints / totalEndpoints) * 100}%`,
                  }}
                />
                <div
                  className="bg-amber-500"
                  style={{
                    width: `${
                      (endpoints.filter(e => e.status === 'at_risk').length / totalEndpoints) * 100
                    }%`,
                  }}
                />
                <div
                  className="bg-gray-500"
                  style={{
                    width: `${
                      (endpoints.filter(e => e.status === 'offline').length / totalEndpoints) * 100
                    }%`,
                  }}
                />
              </div>
              <div className="flex gap-4 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-300">
                    Protected ({protectedEndpoints})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-gray-300">
                    At Risk ({endpoints.filter(e => e.status === 'at_risk').length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full" />
                  <span className="text-gray-300">
                    Offline ({endpoints.filter(e => e.status === 'offline').length})
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Endpoints */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Recently Active</h4>
              {endpoints.slice(0, 3).map(endpoint => (
                <div
                  key={endpoint.id}
                  className="flex items-center justify-between p-3 bg-navy-600 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{endpoint.name}</p>
                    <p className="text-xs text-gray-400">{endpoint.user} · {endpoint.os}</p>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      endpoint.status === 'protected'
                        ? 'bg-green-500'
                        : endpoint.status === 'at_risk'
                        ? 'bg-amber-500'
                        : 'bg-gray-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Threat Breakdown Chart */}
          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Threat Breakdown</h3>
            <ThreatDonutChart threats={threats} />
          </div>
        </div>

        {/* AfricaCERT Banner */}
        <div className="bg-gradient-to-r from-shield-blue/10 to-blue-600/10 border border-shield-blue/30 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-shield-blue/20 rounded-lg">
              <Shield className="h-6 w-6 text-shield-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                AfricaCERT Threat Intelligence Active
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Threat intelligence last updated 4 hours ago from AfricaCERT and CSIRT.ZA — 12 new
                regional signatures loaded. ShieldAI is protecting against ABSA phishing kits, Eskom
                ransomware lures, and other SA-specific threats.
              </p>
              <button className="px-4 py-2 bg-shield-blue hover:bg-shield-electric text-white rounded-lg text-sm font-medium transition-all">
                View Threat Library →
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
