import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Endpoint } from '../../types';
import ScanView from './actions/ScanView';
import UpdateView from './actions/UpdateView';
import IsolateView from './actions/IsolateView';

interface EndpointActionModalProps {
  endpoint: Endpoint;
  action: 'scan' | 'update' | 'isolate';
  onClose: () => void;
}

export default function EndpointActionModal({ endpoint, action, onClose }: EndpointActionModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getOSIcon = (os: string) => {
    if (os.includes('Windows')) return '🪟';
    if (os.includes('macOS') || os.includes('Mac')) return '🍎';
    if (os.includes('Linux') || os.includes('Ubuntu')) return '🐧';
    return '💻';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-navy-700 rounded-xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-navy-600 border-b border-gray-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getOSIcon(endpoint.os)}</span>
            <div>
              <h3 className="text-lg font-semibold text-white">{endpoint.name}</h3>
              <p className="text-sm text-gray-400">
                {endpoint.user} · {endpoint.department} · {endpoint.ip}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-navy-500 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          {action === 'scan' && <ScanView endpoint={endpoint} onComplete={onClose} />}
          {action === 'update' && <UpdateView endpoint={endpoint} onComplete={onClose} />}
          {action === 'isolate' && <IsolateView endpoint={endpoint} onComplete={onClose} />}
        </div>
      </div>
    </div>
  );
}
