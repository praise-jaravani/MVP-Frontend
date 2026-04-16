import { useState } from 'react';
import { ShieldAlert, WifiOff, CheckCircle2, AlertTriangle, Network } from 'lucide-react';
import { Endpoint } from '../../../types';

interface IsolateViewProps {
  endpoint: Endpoint;
  onComplete: () => void;
}

type IsolationStage = 'confirming' | 'isolating' | 'isolated';

export default function IsolateView({ endpoint, onComplete }: IsolateViewProps) {
  const [stage, setStage] = useState<IsolationStage>('confirming');
  const [progress, setProgress] = useState(0);

  const handleConfirmIsolation = () => {
    setStage('isolating');

    // Simulate isolation process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage('isolated'), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  if (stage === 'confirming') {
    return (
      <div className="space-y-6">
        {/* Warning Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-4">
            <ShieldAlert className="h-8 w-8 text-amber-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Isolate Endpoint?</h3>
          <p className="text-gray-400">
            This will disconnect {endpoint.name} from the network
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-500 mb-2">
                Important: Network Isolation
              </h4>
              <p className="text-sm text-gray-300 mb-3">
                Isolating this endpoint will immediately disconnect it from all network resources to
                prevent potential threat spread.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• All network connections will be terminated</li>
                <li>• User will be unable to access network resources</li>
                <li>• Internet access will be blocked</li>
                <li>• Local file access will remain available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Endpoint Info */}
        <div className="bg-navy-600 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-white mb-3">Endpoint Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-400">Name</p>
              <p className="text-white font-medium">{endpoint.name}</p>
            </div>
            <div>
              <p className="text-gray-400">User</p>
              <p className="text-white font-medium">{endpoint.user}</p>
            </div>
            <div>
              <p className="text-gray-400">Department</p>
              <p className="text-white font-medium">{endpoint.department}</p>
            </div>
            <div>
              <p className="text-gray-400">IP Address</p>
              <p className="text-white font-medium font-mono">{endpoint.ip}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onComplete}
            className="flex-1 px-6 py-3 bg-navy-600 hover:bg-navy-500 border border-gray-600 text-white rounded-lg font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmIsolation}
            className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all"
          >
            Isolate Endpoint
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'isolating') {
    return (
      <div className="space-y-6">
        {/* Isolating Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-4">
            <WifiOff className="h-8 w-8 text-amber-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Isolating Endpoint</h3>
          <p className="text-gray-400">
            Disconnecting {endpoint.name} from the network
          </p>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Isolation in progress</span>
            <span className="text-sm font-medium text-amber-500">{progress}%</span>
          </div>
          <div className="relative h-3 bg-navy-600 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Isolation Steps Animation */}
        <div className="bg-navy-600 rounded-lg p-6">
          <div className="space-y-4">
            <div className={`flex items-center gap-3 transition-opacity ${progress > 20 ? 'opacity-100' : 'opacity-30'}`}>
              <CheckCircle2 className={`h-5 w-5 ${progress > 20 ? 'text-green-500' : 'text-gray-600'}`} />
              <span className="text-sm text-gray-300">Terminating active connections</span>
            </div>
            <div className={`flex items-center gap-3 transition-opacity ${progress > 40 ? 'opacity-100' : 'opacity-30'}`}>
              <CheckCircle2 className={`h-5 w-5 ${progress > 40 ? 'text-green-500' : 'text-gray-600'}`} />
              <span className="text-sm text-gray-300">Disabling network adapters</span>
            </div>
            <div className={`flex items-center gap-3 transition-opacity ${progress > 60 ? 'opacity-100' : 'opacity-30'}`}>
              <CheckCircle2 className={`h-5 w-5 ${progress > 60 ? 'text-green-500' : 'text-gray-600'}`} />
              <span className="text-sm text-gray-300">Blocking outbound traffic</span>
            </div>
            <div className={`flex items-center gap-3 transition-opacity ${progress > 80 ? 'opacity-100' : 'opacity-30'}`}>
              <CheckCircle2 className={`h-5 w-5 ${progress > 80 ? 'text-green-500' : 'text-gray-600'}`} />
              <span className="text-sm text-gray-300">Applying firewall rules</span>
            </div>
          </div>
        </div>

        {/* Network Animation */}
        <div className="flex items-center justify-center py-6">
          <div className="relative">
            <Network className="h-16 w-16 text-gray-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <WifiOff className="h-8 w-8 text-amber-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Isolated state
  return (
    <div className="space-y-6">
      {/* Success State */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl" />
          <div className="relative bg-navy-600 rounded-full p-6">
            <ShieldAlert className="h-16 w-16 text-amber-500" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mt-6 mb-2">Endpoint Isolated</h3>
        <p className="text-gray-400 text-center">
          {endpoint.name} has been successfully isolated from the network
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <WifiOff className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-amber-500 mb-2">
              Network Access Disabled
            </h4>
            <p className="text-sm text-gray-300 mb-3">
              This endpoint is now completely isolated from all network resources. No inbound or
              outbound traffic is allowed.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>Isolation active since {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoint Status */}
      <div className="bg-navy-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-3">Current Status</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-400">Network Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <p className="text-amber-500 font-medium">Isolated</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400">Agent Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-green-500 font-medium">Active</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400">User Access</p>
            <p className="text-white font-medium mt-1">Local Only</p>
          </div>
          <div>
            <p className="text-gray-400">Protection</p>
            <p className="text-white font-medium mt-1">Enabled</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-navy-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-2">Next Steps</h4>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>1. Investigate the security incident that required isolation</li>
          <li>2. Run a full system scan to detect any threats</li>
          <li>3. Review logs and endpoint activity</li>
          <li>4. Restore network access once the threat is neutralized</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
            onClick={onComplete}
          className="flex-1 px-6 py-3 bg-navy-600 hover:bg-navy-500 border border-gray-600 text-white rounded-lg font-medium transition-all"
        >
          Close
        </button>
        <button
          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
        >
          Restore Network Access
        </button>
      </div>
    </div>
  );
}
