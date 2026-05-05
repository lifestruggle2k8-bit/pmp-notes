import React, { useState, useEffect } from 'react';
import {
  clearOfflineData,
  isOnline,
  onlineOfflineListener
} from '../utils/offlineStorage';
import client from '../api/client';

interface Settings {
  dailyGoal: number;
  reviewMode: 'all' | 'new-first' | 'overdue-first';
  newCardsPerDay: number;
  enableNotifications: boolean;
  enableOfflineMode: boolean;
  enableAnalytics: boolean;
  theme: 'light' | 'dark' | 'auto';
}

const DEFAULT_SETTINGS: Settings = {
  dailyGoal: 20,
  reviewMode: 'overdue-first',
  newCardsPerDay: 5,
  enableNotifications: true,
  enableOfflineMode: true,
  enableAnalytics: true,
  theme: 'light'
};

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isOnlineStatus, setIsOnlineStatus] = useState(isOnline());
  const [swRegistered, setSwRegistered] = useState(false);
  const [cacheSize, setCacheSize] = useState(0);

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('app_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }

    // Check service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          setSwRegistered(registrations.length > 0);
        });
    }

    // Check offline cache size
    if ('caches' in window) {
      caches.keys().then((names) => {
        let total = 0;
        Promise.all(
          names.map((name) =>
            caches.open(name).then((cache) =>
              cache.keys().then((requests) => {
                total += requests.length;
                setCacheSize(total);
              })
            )
          )
        );
      });
    }

    // Listen to online/offline changes
    const unsubscribe = onlineOfflineListener((online) => {
      setIsOnlineStatus(online);
    });

    return unsubscribe;
  }, []);

  const handleChange = (
    field: keyof Settings,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);

      // Save to localStorage
      localStorage.setItem('app_settings', JSON.stringify(settings));

      // Try to sync with backend
      try {
        await client.post('/user/settings', settings);
      } catch (error) {
        console.log('Settings saved locally (offline mode)');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearCache = async () => {
    if (
      window.confirm(
        'This will clear all cached data. Your progress will still be synced when you go online.'
      )
    ) {
      try {
        await clearOfflineData();
        setCacheSize(0);
        alert('Cache cleared successfully');
      } catch (error) {
        alert('Failed to clear cache');
      }
    }
  };

  const handleRegisterServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          '/service-worker.js'
        );
        setSwRegistered(true);
        alert('Service Worker registered successfully');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        alert('Failed to register Service Worker');
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const handleExportData = async () => {
    try {
      // Fetch user data
      const response = await client.get('/export');
      const data = response.data;

      // Create JSON file
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pmp-flashcard-backup-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to export data');
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your learning experience</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            Settings saved successfully!
          </div>
        )}

        {/* Connection Status */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Connection Status
              </h2>
              <p className="text-gray-600 mt-1">
                {isOnlineStatus ? '🟢 Online' : '🔴 Offline'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Service Worker</p>
              <p className="text-lg font-semibold">
                {swRegistered ? '✓ Active' : '✗ Inactive'}
              </p>
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Learning Preferences
          </h2>

          <div className="space-y-6">
            {/* Daily Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Review Goal
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={settings.dailyGoal}
                  onChange={(e) =>
                    handleChange('dailyGoal', parseInt(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-blue-600 w-12">
                  {settings.dailyGoal}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Cards per day to review
              </p>
            </div>

            {/* Review Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Review Mode
              </label>
              <div className="space-y-2">
                {[
                  { value: 'overdue-first', label: 'Overdue First' },
                  { value: 'new-first', label: 'New Cards First' },
                  { value: 'all', label: 'All Mixed' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="reviewMode"
                      value={option.value}
                      checked={settings.reviewMode === option.value}
                      onChange={(e) =>
                        handleChange(
                          'reviewMode',
                          e.target.value as 'all' | 'new-first' | 'overdue-first'
                        )
                      }
                      className="rounded"
                    />
                    <span className="ml-3 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* New Cards Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Cards Per Day
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={settings.newCardsPerDay}
                  onChange={(e) =>
                    handleChange('newCardsPerDay', parseInt(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-green-600 w-12">
                  {settings.newCardsPerDay}
                </span>
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Theme
              </label>
              <div className="space-y-2">
                {[
                  { value: 'light', label: '☀️ Light' },
                  { value: 'dark', label: '🌙 Dark' },
                  { value: 'auto', label: '🔄 Auto' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value={option.value}
                      checked={settings.theme === option.value}
                      onChange={(e) =>
                        handleChange(
                          'theme',
                          e.target.value as 'light' | 'dark' | 'auto'
                        )
                      }
                      className="rounded"
                    />
                    <span className="ml-3 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Features</h2>

          <div className="space-y-4">
            {[
              {
                key: 'enableNotifications',
                label: 'Push Notifications',
                description: 'Get reminded about daily reviews'
              },
              {
                key: 'enableOfflineMode',
                label: 'Offline Mode',
                description: 'Review cards without internet connection'
              },
              {
                key: 'enableAnalytics',
                label: 'Analytics',
                description: 'Help us improve by sharing usage data'
              }
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{feature.label}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings[feature.key as keyof Settings] as boolean}
                  onChange={(e) =>
                    handleChange(
                      feature.key as keyof Settings,
                      e.target.checked
                    )
                  }
                  className="w-5 h-5 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Offline Storage */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Offline Storage
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Cache Size</p>
                <p className="text-sm text-gray-600">
                  {cacheSize} items cached
                </p>
              </div>
              <button
                onClick={handleClearCache}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                Clear Cache
              </button>
            </div>

            {!swRegistered && (
              <div className="border-t pt-4">
                <button
                  onClick={handleRegisterServiceWorker}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Enable Offline Mode
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Data Management
          </h2>

          <div className="space-y-3">
            <button
              onClick={handleExportData}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              📥 Export Data
            </button>
            <button
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              📤 Import Data
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
          <button
            onClick={() => setSettings(DEFAULT_SETTINGS)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};
