import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/formatters';
import alertsData from '../../data/alerts.json';
import { Alert } from '../../types';

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>(alertsData);
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <header className="sticky top-0 z-20 bg-navy-800/95 backdrop-blur-sm border-b border-gray-700/50 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-white">{title}</h1>

        <div className="flex items-center gap-4">
          {/* Protection Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">Protection Active</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* User Avatar */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-shield-blue flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(user.firstName, user.lastName)}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
