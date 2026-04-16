

interface ThreatFeedItemProps {
  type: 'blocked' | 'quarantined' | 'flagged';
  threat: string;
  endpoint: string;
  ip: string;
  time: string;
}

export default function ThreatFeedItem({ type, threat, endpoint, ip, time }: ThreatFeedItemProps) {
  const dotColors: Record<string, string> = {
    blocked: 'bg-blue-500',
    quarantined: 'bg-green-500',
    flagged: 'bg-amber-500',
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-navy-700/30 hover:bg-navy-700/50 transition-all animate-fade-in border border-gray-700/30">
      <div className={`w-2 h-2 rounded-full ${dotColors[type]} mt-1.5 flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-100 truncate">{threat}</p>
        <p className="text-xs text-gray-400 truncate">{endpoint} · {ip}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
}
