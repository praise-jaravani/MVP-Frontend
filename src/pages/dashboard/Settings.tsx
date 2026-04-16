import { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import { User, Lock, Bell, Zap, CreditCard, Users as UsersIcon, Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getInitials } from '../../utils/formatters';

type Tab = 'profile' | 'security' | 'notifications' | 'integrations' | 'billing' | 'team';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team Members', icon: UsersIcon },
  ];

  return (
    <AppLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-shield-blue text-white'
                    : 'text-gray-400 hover:bg-navy-600 hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-navy-700 border border-gray-700/50 rounded-lg p-8">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'security' && <SecurityTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'integrations' && <IntegrationsTab />}
            {activeTab === 'billing' && <BillingTab />}
            {activeTab === 'team' && <TeamTab />}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function ProfileTab() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
    company: user?.company || '',
    role: user?.role || '',
    city: user?.city || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({ ...user, ...formData });
      showToast('Profile updated successfully!', 'success');
    }
  };

  const handlePhotoUpload = () => {
    showToast('Photo upload available in Growth plan', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Profile Settings</h2>
        <p className="text-gray-400">Manage your personal information and preferences</p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-600">
        <div className="w-20 h-20 rounded-full bg-shield-blue flex items-center justify-center text-white text-2xl font-semibold">
          {user && getInitials(user.firstName, user.lastName)}
        </div>
        <div>
          <button
            onClick={handlePhotoUpload}
            className="px-4 py-2 bg-navy-600 hover:bg-navy-500 border border-gray-600 text-white rounded-lg transition-all text-sm font-medium"
          >
            Change Photo
          </button>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF. Max 2MB.</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
            >
              <option value="IT Manager">IT Manager</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Security Analyst">Security Analyst</option>
              <option value="C-Suite / Executive">C-Suite / Executive</option>
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
              City
            </label>
            <select
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
            >
              <option value="Johannesburg">Johannesburg</option>
              <option value="Cape Town">Cape Town</option>
              <option value="Durban">Durban</option>
              <option value="Pretoria">Pretoria</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

function SecurityTab() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [showPasswords, setShowPasswords] = useState(false);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Password validation
  const passwordChecks = {
    length: passwords.new.length >= 8,
    uppercase: /[A-Z]/.test(passwords.new),
    number: /[0-9]/.test(passwords.new),
    special: /[!@#$%^&*]/.test(passwords.new),
  };

  const passwordsMatch = passwords.new && passwords.confirm && passwords.new === passwords.confirm;
  const allChecksPassed = Object.values(passwordChecks).every(check => check);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.current !== user?.password) {
      showToast('Current password is incorrect', 'error');
      return;
    }

    if (!allChecksPassed) {
      showToast('Please meet all password requirements', 'error');
      return;
    }

    if (!passwordsMatch) {
      showToast('Passwords do not match', 'error');
      return;
    }

    // Update password logic would go here
    showToast('Password updated successfully!', 'success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleSignOutAll = () => {
    showToast('All sessions signed out successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Security Settings</h2>
        <p className="text-gray-400">Manage your password and active sessions</p>
      </div>

      {/* Change Password */}
      <form onSubmit={handleSubmit} className="space-y-6 pb-6 border-b border-gray-600">
        <h3 className="text-lg font-semibold text-white">Change Password</h3>

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showPasswords ? 'text' : 'password'}
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              required
              className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPasswords ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
            New Password
          </label>
          <input
            id="newPassword"
            type={showPasswords ? 'text' : 'password'}
            value={passwords.new}
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            required
            className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
          />

          {/* Password Strength Indicator */}
          {passwords.new && (
            <div className="mt-3 space-y-2">
              {Object.entries({
                length: 'At least 8 characters',
                uppercase: 'One uppercase letter',
                number: 'One number',
                special: 'One special character (!@#$%^&*)',
              }).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  {passwordChecks[key as keyof typeof passwordChecks] ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-500" />
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
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type={showPasswords ? 'text' : 'password'}
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            required
            className={`w-full px-4 py-3 bg-navy-600 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent ${
              passwords.confirm && !passwordsMatch ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          {passwords.confirm && !passwordsMatch && (
            <p className="mt-2 text-sm text-red-500">Passwords do not match</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={!allChecksPassed || !passwordsMatch || !passwords.current}
        >
          Update Password
        </Button>
      </form>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
        <div className="bg-navy-600 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Current Session</p>
              <p className="text-sm text-gray-400">Chrome, Johannesburg — Active now</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        </div>
        <Button variant="danger" onClick={handleSignOutAll}>
          Sign Out All Devices
        </Button>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    criticalThreats: true,
    weeklySummary: true,
    agentUpdates: false,
    africaCertUpdates: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Notification Settings</h2>
        <p className="text-gray-400">Manage how you receive updates from ShieldAI</p>
      </div>

      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-400">
          Notification preferences will sync to your account in a future update.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { key: 'criticalThreats', label: 'Email alerts for critical threats', description: 'Get notified immediately when critical threats are detected' },
          { key: 'weeklySummary', label: 'Weekly summary report', description: 'Receive a comprehensive weekly security summary' },
          { key: 'agentUpdates', label: 'Agent update notifications', description: 'Be informed when new agent versions are available' },
          { key: 'africaCertUpdates', label: 'AfricaCERT feed updates', description: 'Get notified when new threat signatures are loaded' },
        ].map((setting) => (
          <div key={setting.key} className="flex items-start justify-between p-4 bg-navy-600 rounded-lg">
            <div className="flex-1">
              <p className="text-white font-medium mb-1">{setting.label}</p>
              <p className="text-sm text-gray-400">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[setting.key as keyof typeof settings]}
                onChange={(e) => setSettings({ ...settings, [setting.key]: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-shield-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-shield-blue"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsTab() {
  const { showToast } = useToast();

  const integrations = [
    { name: 'Slack', description: 'Send threat alerts to Slack channels', logo: '💬', available: true },
    { name: 'Microsoft Teams', description: 'Integration with Teams for alerts', logo: '👥', available: true },
    { name: 'PagerDuty', description: 'Incident management and escalation', logo: '📟', available: false },
    { name: 'ServiceNow', description: 'ITSM integration for tickets', logo: '🎫', available: false },
  ];

  const handleConnect = (name: string) => {
    showToast(`Integration setup coming in v1.3. Contact support to enable early access to ${name}.`, 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Integrations</h2>
        <p className="text-gray-400">Connect ShieldAI with your existing tools</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div key={integration.name} className="bg-navy-600 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{integration.logo}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{integration.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{integration.description}</p>
                <button
                  onClick={() => handleConnect(integration.name)}
                  className="px-4 py-2 bg-shield-blue hover:bg-shield-electric text-white rounded-lg text-sm font-medium transition-all"
                >
                  {integration.available ? 'Connect' : 'Coming Soon'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingTab() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleManageBilling = () => {
    showToast('Billing management portal coming soon', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Billing & Subscription</h2>
        <p className="text-gray-400">Manage your plan and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="bg-navy-600 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Current Plan</h3>
            <p className="text-gray-400 capitalize">{user?.plan} Plan</p>
          </div>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
            Active
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-4">Next billing date: May 16, 2026</p>
        <Button variant="secondary" onClick={handleManageBilling}>
          Manage Billing
        </Button>
      </div>

      {/* Invoice History */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Invoice History</h3>
        <div className="space-y-2">
          {[
            { date: 'April 16, 2026', amount: 'R35,000', status: 'Paid' },
            { date: 'March 16, 2026', amount: 'R35,000', status: 'Paid' },
            { date: 'February 16, 2026', amount: 'R35,000', status: 'Paid' },
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-navy-600 rounded-lg">
              <div>
                <p className="text-white font-medium">{invoice.date}</p>
                <p className="text-sm text-gray-400">{invoice.amount}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-green-400">{invoice.status}</span>
                <button
                  onClick={() => showToast('PDF download available in Growth plan', 'info')}
                  className="px-3 py-1 bg-navy-700 hover:bg-navy-500 border border-gray-600 rounded-lg text-sm text-white transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamTab() {
  const { showToast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Invitation sent to ${inviteEmail}. Team management available in Growth plan.`, 'success');
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const teamMembers = [
    { name: 'Dhiren Chetty', email: 'dhiren@shieldai.co.za', role: 'Owner', status: 'Active' },
    { name: 'John Smith', email: 'john@shieldai.co.za', role: 'Admin', status: 'Active' },
    { name: 'Sarah Johnson', email: 'sarah@shieldai.co.za', role: 'Member', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Team Members</h2>
          <p className="text-gray-400">Manage who has access to your ShieldAI account</p>
        </div>
        <Button variant="primary" onClick={() => setShowInviteModal(true)}>
          Invite Member
        </Button>
      </div>

      {/* Team Members Table */}
      <div className="bg-navy-600 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-navy-700 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {teamMembers.map((member, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-white">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{member.email}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{member.role}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    member.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-navy-700 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Invite Team Member</h3>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="inviteEmail"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-navy-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-shield-blue focus:border-transparent"
                  placeholder="colleague@company.com"
                />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="ghost" fullWidth onClick={() => setShowInviteModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  Send Invite
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
