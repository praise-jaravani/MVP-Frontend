export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  company: string;
  role: string;
  industry?: string;
  city?: string;
  endpointCount: string;
  plan: 'starter' | 'growth' | 'enterprise';
  createdAt: string;
  avatar: string | null;
};

export type Endpoint = {
  id: string;
  name: string;
  os: string;
  user: string;
  department: string;
  ip: string;
  status: 'protected' | 'at_risk' | 'offline';
  agentVersion: string;
  lastSeen: string;
  threatsBlocked: number;
  healthScore: number;
  location: string;
};

export type Threat = {
  id: string;
  name: string;
  category: 'phishing' | 'ransomware' | 'malware' | 'trojan';
  severity: 'critical' | 'high' | 'medium' | 'low';
  sourceIP: string;
  sourceCountry: string;
  targetEndpoint: string;
  targetUser: string;
  action: 'quarantined' | 'blocked' | 'flagged';
  confidence: number;
  detectedAt: string;
  africanSignature: boolean;
  description: string;
};

export type Alert = {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  endpointId: string | null;
  timestamp: string;
  read: boolean;
};

export type ThreatFeedItem = {
  id: string;
  time: string;
  type: 'blocked' | 'quarantined' | 'flagged';
  threat: string;
  endpoint: string;
  ip: string;
};

export type TrialReport = {
  company: string;
  period: string;
  totalThreats: number;
  threatsBlockedByShieldAI: number;
  threatsMissedByCurrentAV: number;
  criticalIncidents: number;
  highIncidents: number;
  estimatedDamageAvoided: string;
  currentAVName: string;
  africanSpecificThreats: number;
  topThreats: Array<{
    name: string;
    count: number;
    severity: string;
  }>;
};
