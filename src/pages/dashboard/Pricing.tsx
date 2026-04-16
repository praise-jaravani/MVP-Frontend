import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { Check, Building, Users, Rocket, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const { user } = useAuth();
  const { showToast } = useToast();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Building,
      price: 'R2,125',
      period: '/endpoint/month',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 50 endpoints',
        'Windows agent',
        'AfricaCERT intelligence',
        'Email alerts',
        'Basic dashboard',
        '30-day trial available',
        'Email support',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      icon: Users,
      price: 'R2,500',
      period: '/endpoint/month',
      description: 'For growing businesses with advanced needs',
      popular: true,
      features: [
        'Up to 200 endpoints',
        'Windows + macOS + Linux',
        'AfricaCERT + CSIRT.ZA intelligence',
        'Smart alerts + playbooks',
        'Full dashboard + reports',
        'POPIA compliance',
        'Priority support',
        'PDF exports',
        'Team management',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Rocket,
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited endpoints',
        'All Growth features',
        'MSP portal access',
        'Advanced forensics',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom integrations',
        '24/7 phone support',
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === user?.plan) {
      showToast('You are already on this plan', 'info');
    } else if (planId === 'enterprise') {
      showToast('Contact our team at sales@shieldai.co.za to discuss Enterprise options', 'info');
    } else {
      showToast('Contact our team to upgrade your plan', 'info');
    }
  };

  const handleContactSales = () => {
    showToast('Opening email to sales@shieldai.co.za...', 'info');
  };

  return (
    <AppLayout title="Pricing">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg">
            Built for South African businesses. 15% below SentinelOne's entry-tier pricing of R2,941/endpoint/month.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-shield-blue text-white'
                : 'bg-navy-600 text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
              billingCycle === 'annual'
                ? 'bg-shield-blue text-white'
                : 'bg-navy-600 text-gray-400 hover:text-white'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              Save 15%
            </span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-navy-700 rounded-xl overflow-hidden transition-all animate-fade-in ${
                plan.popular
                  ? 'border-2 border-shield-blue shadow-2xl shadow-shield-blue/20 scale-105'
                  : 'border border-gray-600/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-shield-blue to-blue-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  plan.popular ? 'bg-shield-blue/20' : 'bg-navy-600'
                }`}>
                  <plan.icon className={`h-8 w-8 ${
                    plan.popular ? 'text-shield-blue' : 'text-gray-400'
                  }`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                  {billingCycle === 'annual' && plan.price !== 'Custom' && (
                    <p className="text-sm text-green-400 mt-1">~R{Math.round(parseInt(plan.price.replace(/[^\d]/g, '')) * 0.85)}/month billed annually</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {user?.plan === plan.id ? (
                  <button
                    disabled
                    className="w-full py-3 px-4 bg-gray-700 text-gray-400 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : plan.id === 'enterprise' ? (
                  <button
                    onClick={handleContactSales}
                    className="w-full py-3 px-4 bg-navy-600 hover:bg-navy-500 border border-gray-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Contact Sales
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-shield-blue hover:bg-shield-electric text-white shadow-lg shadow-shield-blue/20'
                        : 'bg-navy-600 hover:bg-navy-500 border border-gray-600 text-white'
                    }`}
                  >
                    {user?.plan === 'starter' ? 'Upgrade' : 'Select Plan'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Note */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gray-400 text-sm">
            All prices in South African Rand. Approximately 15% below SentinelOne's entry-tier pricing of R2,941/endpoint/month.
            <br />
            <span className="text-gray-500">Annual plans available with additional 15% discount.</span>
          </p>
        </div>

        {/* FAQ / Additional Info */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Why ShieldAI?</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Trained on SA-specific threats (ABSA, FNB, Eskom, SARS)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Works offline during load-shedding with edge AI</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>POPIA compliant with local data processing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>15% cheaper than global competitors</span>
              </li>
            </ul>
          </div>

          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Need Help Choosing?</h3>
            <p className="text-gray-300 text-sm mb-4">
              Our team can help you select the right plan for your organization and answer any questions.
            </p>
            <button
              onClick={handleContactSales}
              className="flex items-center gap-2 px-4 py-2 bg-shield-blue hover:bg-shield-electric text-white rounded-lg font-medium transition-all"
            >
              <Mail className="h-4 w-4" />
              Contact Sales Team
            </button>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-r from-shield-blue/10 to-blue-600/10 border border-shield-blue/30 rounded-lg p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-3">Enterprise Security for South Africa</h3>
          <p className="text-gray-300 mb-6">
            Custom solutions for 200+ endpoints with dedicated support, advanced forensics, and MSP portal access.
          </p>
          <button
            onClick={handleContactSales}
            className="px-8 py-3 bg-shield-blue hover:bg-shield-electric text-white rounded-lg font-semibold transition-all shadow-lg shadow-shield-blue/20"
          >
            Schedule a Demo
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
