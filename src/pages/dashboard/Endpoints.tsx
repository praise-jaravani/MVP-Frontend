import React, { useState, useMemo } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import { Search, Filter, Download, Monitor, X } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import endpointsData from '../../data/endpoints.json';
import threatsData from '../../data/threats.json';
import { Endpoint, Threat } from '../../types';
import WeeklyBarChart from '../../components/charts/WeeklyBarChart';

export default function Endpoints() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [osFilter, setOsFilter] = useState('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const { showToast } = useToast();

  const endpoints = endpointsData as Endpoint[];
  const threats = threatsData as Threat[];

  // Filter endpoints
  const filteredEndpoints = useMemo(() => {
    return endpoints.filter(endpoint => {
      const matchesSearch =
        endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.ip.includes(searchQuery);

      const matchesStatus = statusFilter === 'all' || endpoint.status === statusFilter;

      const matchesOS =
        osFilter === 'all' ||
        endpoint.os.toLowerCase().includes(osFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesOS;
    });
  }, [endpoints, searchQuery, statusFilter, osFilter]);

  // Get OS icon
  const getOSIcon = (os: string) => {
    if (os.includes('Windows')) return '🪟';
    if (os.includes('macOS') || os.includes('Mac')) return '🍎';
    if (os.includes('Linux') || os.includes('Ubuntu')) return '🐧';
    return '💻';
  };

  // Get threats for specific endpoint
  const getEndpointThreats = (endpointId: string) => {
    return threats.filter(t => t.targetEndpoint === endpointId);
  };

  const handleExport = () => {
    showToast('Export feature coming soon in Growth plan', 'info');
  };

  return (
    <AppLayout title="Endpoints">
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, user, or IP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="protected">Protected</option>
                <option value="at_risk">At Risk</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* OS Filter */}
            <div className="flex gap-2">
              <select
                value={osFilter}
                onChange={(e) => setOsFilter(e.target.value)}
                className="flex-1 px-4 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
              >
                <option value="all">All OS</option>
                <option value="windows">Windows</option>
                <option value="macos">macOS</option>
                <option value="linux">Linux</option>
              </select>

              <button
                onClick={handleExport}
                className="px-4 py-2 bg-navy-600 hover:bg-navy-500 border border-gray-600 rounded-lg text-white transition-colors flex items-center gap-2"
                title="Export"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-sm text-gray-400">
            Showing {filteredEndpoints.length} of {endpoints.length} endpoints
          </div>
        </div>

        {/* Endpoints Table */}
        <div className="bg-navy-700 border border-gray-700/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-600 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Endpoint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Health
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Threats Blocked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Last Seen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredEndpoints.map((endpoint, index) => (
                  <tr
                    key={endpoint.id}
                    className="hover:bg-navy-600/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getOSIcon(endpoint.os)}</span>
                        <div>
                          <p className="text-sm font-medium text-white">{endpoint.name}</p>
                          <p className="text-xs text-gray-400">{endpoint.os}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-white">{endpoint.user}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
                          {endpoint.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={endpoint.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-24">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                endpoint.healthScore >= 90
                                  ? 'bg-green-500'
                                  : endpoint.healthScore >= 60
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${endpoint.healthScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{endpoint.healthScore}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-shield-blue" />
                        <span className="text-sm font-medium text-white">{endpoint.threatsBlocked}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatRelativeTime(endpoint.lastSeen)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm ${
                          endpoint.agentVersion === '1.2.4' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        v{endpoint.agentVersion}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedEndpoint(endpoint)}
                        className="text-sm text-shield-blue hover:text-shield-sky font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Endpoint Detail Drawer */}
      {selectedEndpoint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end animate-fade-in">
          <div className="w-full max-w-md h-full bg-navy-700 shadow-2xl overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-navy-600 border-b border-gray-600 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getOSIcon(selectedEndpoint.os)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedEndpoint.name}</h3>
                  <p className="text-sm text-gray-400">{selectedEndpoint.os}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="p-2 hover:bg-navy-500 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div>
                <StatusBadge status={selectedEndpoint.status} />
              </div>

              {/* Endpoint Info */}
              <div className="bg-navy-600 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">User</span>
                  <span className="text-sm text-white font-medium">{selectedEndpoint.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Department</span>
                  <span className="text-sm text-white font-medium">{selectedEndpoint.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">IP Address</span>
                  <span className="text-sm text-white font-mono">{selectedEndpoint.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Location</span>
                  <span className="text-sm text-white font-medium">{selectedEndpoint.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Last Seen</span>
                  <span className="text-sm text-white">{formatRelativeTime(selectedEndpoint.lastSeen)}</span>
                </div>
              </div>

              {/* Health Score */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Health Score</h4>
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      className="text-gray-700"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - selectedEndpoint.healthScore / 100)}`}
                      className={
                        selectedEndpoint.healthScore >= 90
                          ? 'text-green-500'
                          : selectedEndpoint.healthScore >= 60
                          ? 'text-amber-500'
                          : 'text-red-500'
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{selectedEndpoint.healthScore}</span>
                    <span className="text-sm text-gray-400">Health</span>
                  </div>
                </div>
              </div>

              {/* Threat History */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Threats</h4>
                <div className="bg-navy-600 rounded-lg divide-y divide-gray-700">
                  {getEndpointThreats(selectedEndpoint.id).slice(0, 5).map((threat) => (
                    <div key={threat.id} className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-white">{threat.name}</p>
                        <StatusBadge status={threat.action as any} />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className={`px-2 py-0.5 rounded ${
                          threat.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          threat.severity === 'high' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {threat.severity}
                        </span>
                        <span>•</span>
                        <span>{formatRelativeTime(threat.detectedAt)}</span>
                      </div>
                    </div>
                  ))}
                  {getEndpointThreats(selectedEndpoint.id).length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-400">
                      No threats detected
                    </div>
                  )}
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Weekly Activity</h4>
                <WeeklyBarChart threats={threats} endpointId={selectedEndpoint.id} />
              </div>

              {/* Agent Info */}
              <div className="bg-navy-600 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-3">Agent Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version</span>
                    <span className={selectedEndpoint.agentVersion === '1.2.4' ? 'text-green-500' : 'text-red-500'}>
                      v{selectedEndpoint.agentVersion}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Threats Blocked</span>
                    <span className="text-white font-medium">{selectedEndpoint.threatsBlocked}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => showToast('Force update initiated', 'success')}
                  className="w-full px-4 py-3 bg-shield-blue hover:bg-shield-electric text-white rounded-lg font-medium transition-all"
                >
                  Force Agent Update
                </button>
                <button
                  onClick={() => showToast('Endpoint isolated successfully', 'warning')}
                  className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all"
                >
                  Isolate Endpoint
                </button>
                <button
                  onClick={() => showToast('Scan initiated', 'info')}
                  className="w-full px-4 py-3 bg-navy-600 hover:bg-navy-500 border border-gray-600 text-white rounded-lg font-medium transition-all"
                >
                  Run Full Scan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
