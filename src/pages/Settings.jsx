import React, { useState } from "react";
import { 
  User, Lock, Bell, Shield, Palette, Download, 
  Trash2, Save, Eye, EyeOff, X, Check, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("security");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    pushNotifications: false,
    jobAlerts: true,
    resumeVisibility: "public",
    profileVisibility: "connections",
    theme: "dark"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("Settings saved successfully!");
  };

  const handleExportData = () => {
    // Handle data export
    alert("Data export functionality would be implemented here.");
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion functionality would be implemented here.");
    }
  };

  const tabs = [
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* Header */}
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage your account settings and preferences
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
                >
                  <Download size={18} />
                  Export Data
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Security Settings</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Change your password and manage security preferences.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                      <div>
                        <p className="font-medium">2FA is disabled</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Notification Preferences</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Manage how you receive notifications from the platform.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Receive important updates via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Receive browser notifications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="pushNotifications"
                          checked={formData.pushNotifications}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-medium">Job Alerts</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Get notified about new job opportunities
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="jobAlerts"
                          checked={formData.jobAlerts}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Privacy Settings</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Control your privacy and data sharing preferences.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Resume Visibility</label>
                      <select
                        name="resumeVisibility"
                        value={formData.resumeVisibility}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                      >
                        <option value="public">Public (Visible to all companies)</option>
                        <option value="connections">Only my connections</option>
                        <option value="private">Private (Only me)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                      <select
                        name="profileVisibility"
                        value={formData.profileVisibility}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                      >
                        <option value="public">Public</option>
                        <option value="connections">Only my connections</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-medium">Data Sharing with Recruiters</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Allow recruiters to view your profile and contact you
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Appearance</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Customize how the portal looks and feels.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.theme === "light" 
                            ? "border-indigo-500 ring-2 ring-indigo-500/20" 
                            : "border-slate-300 dark:border-slate-600 hover:border-slate-400"
                        }`}
                        onClick={() => setFormData({...formData, theme: "light"})}
                      >
                        <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
                          <div className="h-2 bg-slate-200 rounded-full mb-2"></div>
                          <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-5 w-5 rounded-full border mr-2 ${
                            formData.theme === "light" 
                              ? "border-indigo-500 bg-indigo-500" 
                              : "border-slate-400"
                          }`}></div>
                          <span className="text-sm font-medium">Light</span>
                        </div>
                      </div>

                      <div 
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.theme === "dark" 
                            ? "border-indigo-500 ring-2 ring-indigo-500/20" 
                            : "border-slate-300 dark:border-slate-600 hover:border-slate-400"
                        }`}
                        onClick={() => setFormData({...formData, theme: "dark"})}
                      >
                        <div className="bg-slate-800 p-3 rounded-lg shadow-sm mb-3">
                          <div className="h-2 bg-slate-600 rounded-full mb-2"></div>
                          <div className="h-2 bg-slate-600 rounded-full w-3/4"></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-5 w-5 rounded-full border mr-2 ${
                            formData.theme === "dark" 
                              ? "border-indigo-500 bg-indigo-500" 
                              : "border-slate-400"
                          }`}></div>
                          <span className="text-sm font-medium">Dark</span>
                        </div>
                      </div>

                      <div 
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.theme === "system" 
                            ? "border-indigo-500 ring-2 ring-indigo-500/20" 
                            : "border-slate-300 dark:border-slate-600 hover:border-slate-400"
                        }`}
                        onClick={() => setFormData({...formData, theme: "system"})}
                      >
                        <div className="bg-gradient-to-r from-white to-slate-800 p-3 rounded-lg shadow-sm mb-3">
                          <div className="h-2 bg-slate-300 rounded-full mb-2"></div>
                          <div className="h-2 bg-slate-600 rounded-full w-3/4"></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-5 w-5 rounded-full border mr-2 ${
                            formData.theme === "system" 
                              ? "border-indigo-500 bg-indigo-500" 
                              : "border-slate-400"
                          }`}></div>
                          <span className="text-sm font-medium">System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;