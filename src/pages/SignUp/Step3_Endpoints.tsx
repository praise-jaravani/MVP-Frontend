import React, { useState } from 'react';
import { Building, Users, Rocket } from 'lucide-react';
import Button from '../../components/ui/Button';
import { SignUpData } from './SignUpLayout';

interface Step3Props {
  data: Partial<SignUpData>;
  onNext: (data: Partial<SignUpData>) => void;
  onBack: () => void;
}

const tiers = [
  {
    value: '1-50',
    icon: Building,
    title: 'Starter',
    subtitle: '1–50 endpoints',
    price: 'R2,125/month',
  },
  {
    value: '51-200',
    icon: Users,
    title: 'Growth',
    subtitle: '51–200 endpoints',
    price: 'R2,500/month',
    popular: true,
  },
  {
    value: '201-500',
    icon: Rocket,
    title: 'Enterprise',
    subtitle: '201–500 endpoints',
    price: 'Custom pricing',
  },
];

export default function Step3_Endpoints({ data, onNext, onBack }: Step3Props) {
  const [selectedTier, setSelectedTier] = useState(data.endpointCount || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTier) {
      onNext({ endpointCount: selectedTier });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          How many devices need protection?
        </h2>
        <p className="text-gray-400 text-sm">Choose the plan that fits your organization</p>
      </div>

      <div className="space-y-3">
        {tiers.map((tier) => (
          <button
            key={tier.value}
            type="button"
            onClick={() => setSelectedTier(tier.value)}
            className={`w-full p-5 rounded-lg border-2 transition-all text-left relative ${
              selectedTier === tier.value
                ? 'border-shield-blue bg-shield-blue/10'
                : 'border-gray-600 bg-navy-600 hover:border-gray-500'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-2 right-4 px-3 py-0.5 bg-shield-blue rounded-full text-xs font-semibold text-white">
                Most Popular
              </div>
            )}
            <div className="flex items-start gap-4">
              <tier.icon
                className={`h-10 w-10 flex-shrink-0 ${
                  selectedTier === tier.value ? 'text-shield-blue' : 'text-gray-400'
                }`}
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">{tier.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{tier.subtitle}</p>
                <p
                  className={`text-sm font-medium ${
                    selectedTier === tier.value ? 'text-shield-blue' : 'text-gray-300'
                  }`}
                >
                  {tier.price}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="ghost" fullWidth onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary" fullWidth disabled={!selectedTier}>
          Continue
        </Button>
      </div>
    </form>
  );
}
