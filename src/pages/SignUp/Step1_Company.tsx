import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { SignUpData } from './SignUpLayout';

interface Step1Props {
  data: Partial<SignUpData>;
  onNext: (data: Partial<SignUpData>) => void;
}

export default function Step1_Company({ data, onNext }: Step1Props) {
  const [company, setCompany] = useState(data.company || '');
  const [industry, setIndustry] = useState(data.industry || '');
  const [city, setCity] = useState(data.city || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ company, industry, city });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Tell us about your company
        </h2>
        <p className="text-gray-400 text-sm">We'll customize ShieldAI for your business</p>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all"
          placeholder="Acme Corporation"
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
          Industry
        </label>
        <select
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          required
          className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all"
        >
          <option value="">Select an industry</option>
          <option value="Financial Services">Financial Services</option>
          <option value="Legal">Legal</option>
          <option value="Retail">Retail</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Technology">Technology</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
          City
        </label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all"
        >
          <option value="">Select a city</option>
          <option value="Johannesburg">Johannesburg</option>
          <option value="Cape Town">Cape Town</option>
          <option value="Durban">Durban</option>
          <option value="Pretoria">Pretoria</option>
          <option value="Port Elizabeth">Port Elizabeth</option>
          <option value="Bloemfontein">Bloemfontein</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Button type="submit" variant="primary" fullWidth>
        Continue
      </Button>
    </form>
  );
}
