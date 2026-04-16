
import { getStatusColor } from '../../utils/formatters';

interface StatusBadgeProps {
  status: 'protected' | 'at_risk' | 'offline' | 'quarantined' | 'blocked' | 'flagged';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const labels: Record<string, string> = {
    protected: 'Protected',
    at_risk: 'At Risk',
    offline: 'Offline',
    quarantined: 'Quarantined',
    blocked: 'Blocked',
    flagged: 'Flagged',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {labels[status]}
    </span>
  );
}
