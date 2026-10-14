'use client';

import { useState, useEffect } from 'react';
import { Save, Shield, MapPin, Phone, Mail, Clock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { settingsAPI, authAPI } from '@/lib/api';

const SettingSection = ({ icon: Icon, title, description, children }: any) => (
  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
    <div className="flex items-start gap-4 mb-6">
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon size={24} className="text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

export default function SettingsDashboard() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  
  const [formData, setFormData] = useState({
    officeAddress: '',
    phone: '',
    email: '',
    businessHours: ''
  });

  // Password change state
  const [currentPasswordP, setCurrentPasswordP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentP, setShowCurrentP] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Email change state
  const [currentPasswordE, setCurrentPasswordE] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showCurrentE, setShowCurrentE] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Password requirements
  const pwdRules = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
    { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) }
  ];

  useEffect(() => {
    setIsHydrated(true);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.success) {
        setFormData(response.data.settings);
      }
    } catch (err: any) {
      setError('Failed to load settings');
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSaved(false);

    try {
      const response = await settingsAPI.update(formData);
      if (response.data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    // Validate form
    if (!currentPasswordP || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (confirmPassword !== newPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Validate requirements
    const failedRules = pwdRules.filter(rule => !rule.test(newPassword));
    if (failedRules.length > 0) {
      setPasswordError('Password does not meet requirements: ' + failedRules.map(r => r.label).join(', '));
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await authAPI.changePassword(currentPasswordP, newPassword);
      if (response.data.success) {
        setPasswordSuccess(true);
        setCurrentPasswordP('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSuccess(false), 3000);
      }
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess(false);

    // Validate form
    if (!currentPasswordE || !newEmail) {
      setEmailError('All fields are required');
      return;
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError('Invalid email format');
      return;
    }

    setEmailLoading(true);
    try {
      const response = await authAPI.changeEmail(currentPasswordE, newEmail);
      if (response.data.success) {
        setEmailSuccess(true);
        setCurrentPasswordE('');
        setNewEmail('');
        setTimeout(() => setEmailSuccess(false), 3000);
      }
    } catch (err: any) {
      setEmailError(err.response?.data?.message || 'Failed to change email');
    } finally {
      setEmailLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="space-y-8">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-2">Manage contact information displayed on the website</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Contact Information Settings */}
      <SettingSection
        icon={MapPin}
        title="Contact Information"
        description="Update the contact details shown on the website's contact section"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Office Address
            </label>
            <input
              type="text"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              placeholder="Enter office address"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Business Hours
            </label>
            <input
              type="text"
              name="businessHours"
              value={formData.businessHours}
              onChange={handleChange}
              placeholder="e.g., Mon – Sat: 9:00 AM – 7:00 PM"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
              disabled={loading}
            />
          </div>
        </div>
      </SettingSection>

      {/* Security Settings */}
      <SettingSection
        icon={Shield}
        title="Security"
        description="Update your password and email settings"
      >
        <div className="space-y-12">
          {/* Change Password Subsection */}
          <div>
            <h4 className="text-md font-bold text-gray-900 mb-6">Change Password</h4>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentP ? 'text' : 'password'}
                    value={currentPasswordP}
                    onChange={(e) => setCurrentPasswordP(e.target.value)}
                    placeholder="Enter current password"
                    disabled={passwordLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentP(!showCurrentP)}
                    disabled={passwordLoading}
                    className="absolute right-3 top-3 text-gray-600 disabled:opacity-50"
                  >
                    {showCurrentP ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    disabled={passwordLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    disabled={passwordLoading}
                    className="absolute right-3 top-3 text-gray-600 disabled:opacity-50"
                  >
                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    disabled={passwordLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    disabled={passwordLoading}
                    className="absolute right-3 top-3 text-gray-600 disabled:opacity-50"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-3">Password Requirements:</p>
                <ul className="space-y-2">
                  {pwdRules.map((rule) => {
                    const met = rule.test(newPassword);
                    return (
                      <li key={rule.label} className={`text-sm flex items-center gap-2 ${met ? 'text-green-600' : 'text-gray-600'}`}>
                        <span className={`inline-block w-2 h-2 rounded-full ${met ? 'bg-green-600' : 'bg-gray-300'}`} />
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {passwordError && (
                <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="text-green-600 text-sm p-3 bg-green-50 rounded-lg">
                  Password changed successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={passwordLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed w-full"
              >
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Change Email Subsection */}
          <div className="border-t pt-8">
            <h4 className="text-md font-bold text-gray-900 mb-6">Change Email</h4>
            <form onSubmit={handleChangeEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentE ? 'text' : 'password'}
                    value={currentPasswordE}
                    onChange={(e) => setCurrentPasswordE(e.target.value)}
                    placeholder="Enter current password"
                    disabled={emailLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentE(!showCurrentE)}
                    disabled={emailLoading}
                    className="absolute right-3 top-3 text-gray-600 disabled:opacity-50"
                  >
                    {showCurrentE ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                  disabled={emailLoading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
                />
              </div>

              {emailError && (
                <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
                  {emailError}
                </div>
              )}

              {emailSuccess && (
                <div className="text-green-600 text-sm p-3 bg-green-50 rounded-lg">
                  Email changed successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={emailLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed w-full"
              >
                {emailLoading ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </div>
        </div>
      </SettingSection>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button 
          onClick={fetchSettings}
          disabled={loading}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Save size={20} />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
