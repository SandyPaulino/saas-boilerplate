import { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    primaryColor: '#2563eb',
    logo: 'default.png'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // In a real app, you'd fetch tenant settings from the API
    setLoading(false);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      // In a real app, you'd save settings to the API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setMessage('Settings saved successfully!');
    } catch (error) {
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      {message && (
        <div className={`mb-4 p-4 rounded ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded shadow p-6">
        <form onSubmit={handleSave}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
              className="w-20 h-10 border rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              Choose your brand's primary color
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              value={settings.logo}
              onChange={(e) => setSettings({...settings, logo: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/logo.png"
            />
            <p className="text-sm text-gray-500 mt-1">
              URL to your company logo
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
