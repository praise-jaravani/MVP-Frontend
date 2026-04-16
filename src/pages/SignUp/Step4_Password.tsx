import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import { SignUpData } from './SignUpLayout';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { signUp } from '../../utils/auth';

interface Step4Props {
  data: Partial<SignUpData>;
  onBack: () => void;
}

export default function Step4_Password({ data, onBack }: Step4Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  // Auto-generate username from name
  React.useEffect(() => {
    if (firstName && lastName && !username) {
      setUsername(`${firstName.toLowerCase()}.${lastName.toLowerCase()}`);
    }
  }, [firstName, lastName]);

  // Password validation
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const allChecksPassed = Object.values(passwordChecks).every(check => check);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allChecksPassed) {
      showToast('Please meet all password requirements', 'error');
      return;
    }

    if (!passwordsMatch) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (!agreedToTerms) {
      showToast('Please agree to the terms and conditions', 'error');
      return;
    }

    setLoading(true);

    try {
      const newUser = signUp({
        firstName,
        lastName,
        email,
        username,
        password,
        company: data.company || '',
        role: data.role || '',
        industry: data.industry,
        city: data.city,
        endpointCount: data.endpointCount || '1-50',
      });

      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast('Failed to create account. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Set up your account
        </h2>
        <p className="text-gray-400 text-sm">Create your ShieldAI credentials</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-3 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-3 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all text-sm"
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-2 space-y-1">
            {Object.entries({
              length: 'At least 8 characters',
              uppercase: 'One uppercase letter',
              number: 'One number',
              special: 'One special character (!@#$%^&*)',
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                {passwordChecks[key as keyof typeof passwordChecks] ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <X className="h-3 w-3 text-gray-500" />
                )}
                <span
                  className={
                    passwordChecks[key as keyof typeof passwordChecks]
                      ? 'text-green-500'
                      : 'text-gray-400'
                  }
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`w-full px-3 py-2 bg-navy-600 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent transition-all text-sm ${
            confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-gray-600'
          }`}
        />
        {confirmPassword && !passwordsMatch && (
          <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-600 bg-navy-600 text-shield-blue focus:ring-2 focus:ring-shield-blue"
        />
        <label htmlFor="terms" className="text-xs text-gray-400">
          I agree to the <span className="text-shield-blue">Terms of Service</span> and{' '}
          <span className="text-shield-blue">Privacy Policy</span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" fullWidth onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={!allChecksPassed || !passwordsMatch || !agreedToTerms}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
}
