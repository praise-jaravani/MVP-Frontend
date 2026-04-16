import React from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

interface AlertBannerProps {
  type: 'critical' | 'warning' | 'info';
  message: string;
  onDismiss?: () => void;
}

export default function AlertBanner({ type, message, onDismiss }: AlertBannerProps) {
  const config = {
    critical: {
      bg: 'bg-red-500/10 border-red-500/30',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      iconBg: 'bg-red-500/20',
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      iconBg: 'bg-amber-500/20',
    },
    info: {
      bg: 'bg-blue-500/10 border-blue-500/30',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      iconBg: 'bg-blue-500/20',
    },
  };

  const { bg, icon, iconBg } = config[type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${bg} animate-slide-up`}>
      <div className={`p-2 rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <p className="flex-1 text-sm text-gray-100">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
