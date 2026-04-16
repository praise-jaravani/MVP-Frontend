import React, { useState } from 'react';
import { UserCog, Briefcase, Shield, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import { SignUpData } from './SignUpLayout';

interface Step2Props {
  data: Partial<SignUpData>;
  onNext: (data: Partial<SignUpData>) => void;
  onBack: () => void;
}

const roles = [
  {
    value: 'IT Manager',
    icon: UserCog,
    title: 'IT Manager',
    description: 'Manage infrastructure and security',
  },
  {
    value: 'Business Owner',
    icon: Briefcase,
    title: 'Business Owner',
    description: 'Protect your business assets',
  },
  {
    value: 'Security Analyst',
    icon: Shield,
    title: 'Security Analyst',
    description: 'Monitor and respond to threats',
  },
  {
    value: 'C-Suite / Executive',
    icon: Users,
    title: 'C-Suite / Executive',
    description: 'Oversee organizational security',
  },
];

export default function Step2_Role({ data, onNext, onBack }: Step2Props) {
  const [selectedRole, setSelectedRole] = useState(data.role || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onNext({ role: selectedRole });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Who are you in the organisation?
        </h2>
        <p className="text-gray-400 text-sm">Help us tailor your experience</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => setSelectedRole(role.value)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedRole === role.value
                ? 'border-shield-blue bg-shield-blue/10'
                : 'border-gray-600 bg-navy-600 hover:border-gray-500'
            }`}
          >
            <role.icon
              className={`h-8 w-8 mb-3 ${
                selectedRole === role.value ? 'text-shield-blue' : 'text-gray-400'
              }`}
            />
            <h3 className="text-white font-semibold text-sm mb-1">{role.title}</h3>
            <p className="text-gray-400 text-xs">{role.description}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="ghost" fullWidth onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary" fullWidth disabled={!selectedRole}>
          Continue
        </Button>
      </div>
    </form>
  );
}
