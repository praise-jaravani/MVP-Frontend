import { formatDistanceToNow, format } from 'date-fns';

export function formatRelativeTime(dateString: string): string {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return 'Unknown';
  }
}

export function formatDate(dateString: string, formatStr: string = 'MMM dd, yyyy'): string {
  try {
    return format(new Date(dateString), formatStr);
  } catch {
    return 'Unknown';
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  } catch {
    return 'Unknown';
  }
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: 'text-red-500 bg-red-500/10 border-red-500/30',
    high: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    low: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
  };
  return colors[severity] || colors.low;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    protected: 'text-green-500 bg-green-500/10 border-green-500/30',
    at_risk: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    offline: 'text-gray-500 bg-gray-500/10 border-gray-500/30',
    quarantined: 'text-green-500 bg-green-500/10 border-green-500/30',
    blocked: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
    flagged: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  };
  return colors[status] || colors.offline;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    phishing: 'text-shield-blue bg-shield-blue/10 border-shield-blue/30',
    ransomware: 'text-red-500 bg-red-500/10 border-red-500/30',
    malware: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    trojan: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30',
  };
  return colors[category] || 'text-gray-400 bg-gray-400/10 border-gray-400/30';
}
