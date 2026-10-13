'use client';

import { useState } from 'react';
import { Save, Bell, Shield, Palette, AlertCircle } from 'lucide-react';

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
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const ToggleSwitch = ({ checked, onChange }: any) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-14 h-8 rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : ''
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-2">Manage your admin preferences and configurations</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Notifications Settings */}
      <SettingSection
        icon={Bell}
        title="Notifications"
        description="Manage how you receive alerts and updates"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600 mt-1">
                Receive email alerts for important updates
              </p>
            </div>
            <ToggleSwitch
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600 mt-1">
                  Receive push notifications on your devices
                </p>
              </div>
              <ToggleSwitch
                checked={pushNotifications}
                onChange={setPushNotifications}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Alerts</p>
                <p className="text-sm text-gray-600 mt-1">
                  Receive SMS for urgent matters
                </p>
              </div>
              <ToggleSwitch
                checked={smsAlerts}
                onChange={setSmsAlerts}
              />
            </div>
          </div>
        </div>
      </SettingSection>

      {/* Security Settings */}
      <SettingSection
        icon={Shield}
        title="Security"
        description="Update your password and security preferences"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </SettingSection>

      {/* Appearance Settings */}
      <SettingSection
        icon={Palette}
        title="Appearance"
        description="Customize the look and feel of the dashboard"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Theme
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="theme" value="light" defaultChecked className="mr-2" />
                <span className="text-gray-700">Light</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="theme" value="dark" className="mr-2" />
                <span className="text-gray-700">Dark</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="theme" value="auto" className="mr-2" />
                <span className="text-gray-700">Auto</span>
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Language
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </SettingSection>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-900 font-bold hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
