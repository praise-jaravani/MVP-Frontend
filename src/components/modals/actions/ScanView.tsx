import { useState, useEffect } from 'react';
import { Shield, CheckCircle2, AlertTriangle, FileSearch } from 'lucide-react';
import { Endpoint } from '../../../types';

interface ScanViewProps {
  endpoint: Endpoint;
  onComplete: () => void;
}

interface ScanStats {
  filesScanned: number;
  totalFiles: number;
  threatsFound: number;
  currentPath: string;
  stage: 'scanning' | 'complete';
}

const SAMPLE_PATHS = [
  'C:\\Users\\{user}\\AppData\\Local\\Temp\\cache.dat',
  'C:\\Program Files\\Common Files\\system32.dll',
  'C:\\Users\\{user}\\Documents\\invoice_Q1.pdf',
  'C:\\Users\\{user}\\Downloads\\setup.exe',
  'C:\\Windows\\System32\\drivers\\network.sys',
  'C:\\Users\\{user}\\AppData\\Roaming\\config.json',
  'C:\\Program Files (x86)\\Application\\data\\settings.xml',
  'C:\\Users\\{user}\\Desktop\\report_2026.xlsx',
  'C:\\Windows\\Temp\\update_cache.tmp',
  'C:\\Users\\{user}\\Pictures\\metadata.db',
];

export default function ScanView({ endpoint, onComplete }: ScanViewProps) {
  const [stats, setStats] = useState<ScanStats>({
    filesScanned: 0,
    totalFiles: 45293,
    threatsFound: 0,
    currentPath: 'Initializing scan...',
    stage: 'scanning',
  });

  useEffect(() => {
    const scanDuration = 8000; // 8 seconds total
    const updateInterval = 100; // Update every 100ms
    const totalUpdates = scanDuration / updateInterval;
    const filesPerUpdate = stats.totalFiles / totalUpdates;

    let currentUpdate = 0;
    let threatsFoundCount = 0;

    const interval = setInterval(() => {
      currentUpdate++;
      const newFilesScanned = Math.min(
        Math.floor(currentUpdate * filesPerUpdate),
        stats.totalFiles
      );

      // Randomly find threats (very low probability)
      if (Math.random() < 0.02 && threatsFoundCount < 3) {
        threatsFoundCount++;
      }

      // Update current path being scanned
      const randomPath = SAMPLE_PATHS[Math.floor(Math.random() * SAMPLE_PATHS.length)].replace(
        '{user}',
        endpoint.user.split(' ')[0]
      );

      setStats({
        filesScanned: newFilesScanned,
        totalFiles: stats.totalFiles,
        threatsFound: threatsFoundCount,
        currentPath: randomPath,
        stage: newFilesScanned >= stats.totalFiles ? 'complete' : 'scanning',
      });

      if (newFilesScanned >= stats.totalFiles) {
        clearInterval(interval);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [endpoint.user]);

  const progress = (stats.filesScanned / stats.totalFiles) * 100;

  if (stats.stage === 'complete') {
    return (
      <div className="space-y-6">
        {/* Success State */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
            <CheckCircle2 className="h-20 w-20 text-green-500 relative animate-fade-in" />
          </div>
          <h3 className="text-2xl font-bold text-white mt-6 mb-2">Scan Complete</h3>
          <p className="text-gray-400 text-center">
            Full system scan finished successfully
          </p>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-navy-600 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-white">{stats.filesScanned.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-1">Files Scanned</p>
          </div>
          <div className="bg-navy-600 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{stats.threatsFound}</p>
            <p className="text-sm text-gray-400 mt-1">Threats Found</p>
          </div>
          <div className="bg-navy-600 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-shield-blue">0</p>
            <p className="text-sm text-gray-400 mt-1">Actions Required</p>
          </div>
        </div>

        {/* Threats Found (if any) */}
        {stats.threatsFound > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-amber-500 mb-2">
                  {stats.threatsFound} Threat{stats.threatsFound > 1 ? 's' : ''} Detected
                </h4>
                <p className="text-sm text-gray-300">
                  All threats have been automatically quarantined. No action required.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onComplete}
            className="flex-1 px-6 py-3 bg-shield-blue hover:bg-shield-electric text-white rounded-lg font-medium transition-all"
          >
            Done
          </button>
          <button
            className="px-6 py-3 bg-navy-600 hover:bg-navy-500 border border-gray-600 text-white rounded-lg font-medium transition-all"
          >
            View Detailed Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scanning Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-shield-blue/20 rounded-full mb-4">
          <Shield className="h-8 w-8 text-shield-blue animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Running Full System Scan</h3>
        <p className="text-gray-400">
          Scanning {endpoint.name} for threats and vulnerabilities
        </p>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            {stats.filesScanned.toLocaleString()} / {stats.totalFiles.toLocaleString()} files
          </span>
          <span className="text-sm font-medium text-shield-blue">{Math.floor(progress)}%</span>
        </div>
        <div className="relative h-3 bg-navy-600 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-shield-blue to-shield-electric rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Animated shimmer effect */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-navy-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <FileSearch className="h-4 w-4 text-gray-400" />
            <p className="text-xs text-gray-400">Files Scanned</p>
          </div>
          <p className="text-2xl font-bold text-white">{stats.filesScanned.toLocaleString()}</p>
        </div>
        <div className="bg-navy-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-xs text-gray-400">Threats Found</p>
          </div>
          <p className="text-2xl font-bold text-amber-500">{stats.threatsFound}</p>
        </div>
        <div className="bg-navy-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-green-500" />
            <p className="text-xs text-gray-400">Items Cleaned</p>
          </div>
          <p className="text-2xl font-bold text-green-500">{stats.threatsFound}</p>
        </div>
      </div>

      {/* Current Scanning Path */}
      <div className="bg-navy-600 rounded-lg p-4">
        <p className="text-xs text-gray-400 mb-2">Currently Scanning:</p>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-shield-blue rounded-full animate-pulse" />
            <span className="w-1.5 h-1.5 bg-shield-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-1.5 h-1.5 bg-shield-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-sm text-gray-300 font-mono truncate">{stats.currentPath}</p>
        </div>
      </div>

      {/* Estimated Time */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
        <span>Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 12.5))}s</span>
      </div>
    </div>
  );
}
