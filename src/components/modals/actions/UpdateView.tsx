import { useState, useEffect } from 'react';
import { Download, CheckCircle2, Loader2, RefreshCw, Shield } from 'lucide-react';
import { Endpoint } from '../../../types';

interface UpdateViewProps {
  endpoint: Endpoint;
  onComplete: () => void;
}

type UpdateStage = 'downloading' | 'installing' | 'restarting' | 'complete';

interface UpdateStep {
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export default function UpdateView({ endpoint, onComplete }: UpdateViewProps) {
  const [stage, setStage] = useState<UpdateStage>('downloading');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [steps, setSteps] = useState<UpdateStep[]>([
    { label: 'Downloading agent update', status: 'active' },
    { label: 'Installing update package', status: 'pending' },
    { label: 'Restarting agent service', status: 'pending' },
    { label: 'Verifying installation', status: 'pending' },
  ]);

  const oldVersion = endpoint.agentVersion;
  const newVersion = '1.2.4';

  useEffect(() => {
    // Download phase (3 seconds)
    const downloadInterval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(downloadInterval);
          // Move to installation
          setTimeout(() => {
            setStage('installing');
            setSteps((prev) => [
              { ...prev[0], status: 'complete' },
              { ...prev[1], status: 'active' },
              prev[2],
              prev[3],
            ]);

            // Installation phase (2 seconds)
            setTimeout(() => {
              setStage('restarting');
              setSteps((prev) => [
                prev[0],
                { ...prev[1], status: 'complete' },
                { ...prev[2], status: 'active' },
                prev[3],
              ]);

              // Restart phase (2 seconds)
              setTimeout(() => {
                setSteps((prev) => [
                  prev[0],
                  prev[1],
                  { ...prev[2], status: 'complete' },
                  { ...prev[3], status: 'active' },
                ]);

                // Complete phase (1 second)
                setTimeout(() => {
                  setStage('complete');
                  setSteps((prev) => prev.map((step) => ({ ...step, status: 'complete' })));
                }, 1000);
              }, 2000);
            }, 2000);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(downloadInterval);
  }, []);

  if (stage === 'complete') {
    return (
      <div className="space-y-6">
        {/* Success State */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
            <CheckCircle2 className="h-20 w-20 text-green-500 relative animate-fade-in" />
          </div>
          <h3 className="text-2xl font-bold text-white mt-6 mb-2">Update Complete</h3>
          <p className="text-gray-400 text-center">
            Agent successfully updated to version {newVersion}
          </p>
        </div>

        {/* Version Comparison */}
        <div className="bg-navy-600 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-sm text-gray-400 mb-1">Previous Version</p>
              <p className="text-2xl font-bold text-gray-500">v{oldVersion}</p>
            </div>
            <div className="px-4">
              <div className="h-0.5 w-8 bg-gray-600" />
            </div>
            <div className="text-center flex-1">
              <p className="text-sm text-gray-400 mb-1">Current Version</p>
              <p className="text-2xl font-bold text-green-500">v{newVersion}</p>
            </div>
          </div>
        </div>

        {/* Update Details */}
        <div className="bg-shield-blue/10 border border-shield-blue/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-shield-blue flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-shield-blue mb-2">
                What's New in v{newVersion}
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Enhanced SA-specific threat detection signatures</li>
                <li>• Improved ransomware behavior analysis</li>
                <li>• Performance optimizations for low-bandwidth environments</li>
                <li>• Bug fixes and stability improvements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onComplete}
            className="w-full px-6 py-3 bg-shield-blue hover:bg-shield-electric text-white rounded-lg font-medium transition-all"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Update Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-shield-blue/20 rounded-full mb-4">
          <Download className="h-8 w-8 text-shield-blue animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Updating Agent</h3>
        <p className="text-gray-400">
          Updating from v{oldVersion} to v{newVersion}
        </p>
      </div>

      {/* Download Progress (only show during download phase) */}
      {stage === 'downloading' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Downloading update package</span>
            <span className="text-sm font-medium text-shield-blue">{downloadProgress}%</span>
          </div>
          <div className="relative h-3 bg-navy-600 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-shield-blue to-shield-electric rounded-full transition-all duration-300 ease-out"
              style={{ width: `${downloadProgress}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>{(downloadProgress * 1.45).toFixed(1)} MB / 145 MB</span>
            <span>~{Math.max(0, Math.ceil((100 - downloadProgress) / 33))}s remaining</span>
          </div>
        </div>
      )}

      {/* Installation Steps */}
      <div className="bg-navy-600 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-white mb-4">Update Progress</h4>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              {step.status === 'complete' ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : step.status === 'active' ? (
                <Loader2 className="h-5 w-5 text-shield-blue flex-shrink-0 animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
              )}
              <span
                className={`text-sm ${
                  step.status === 'complete'
                    ? 'text-gray-400'
                    : step.status === 'active'
                    ? 'text-white font-medium'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Stage Indicator */}
      <div className="bg-navy-600 rounded-lg p-4">
        <div className="flex items-center gap-3">
          {stage === 'downloading' && (
            <>
              <Download className="h-5 w-5 text-shield-blue animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Downloading Update</p>
                <p className="text-xs text-gray-400">Fetching latest agent package from secure server</p>
              </div>
            </>
          )}
          {stage === 'installing' && (
            <>
              <Loader2 className="h-5 w-5 text-shield-blue animate-spin" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Installing Package</p>
                <p className="text-xs text-gray-400">Applying update to agent files</p>
              </div>
            </>
          )}
          {stage === 'restarting' && (
            <>
              <RefreshCw className="h-5 w-5 text-shield-blue animate-spin" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Restarting Service</p>
                <p className="text-xs text-gray-400">Restarting ShieldAI agent service</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Warning */}
      <div className="text-center text-xs text-gray-500">
        Please do not close this window or shut down the endpoint during the update
      </div>
    </div>
  );
}
