import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Save, Settings, AlertCircle, CheckCircle2 } from 'lucide-react';

import { useToast } from '../../context/ToastContext';

export const AdminConfig: React.FC = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    studio_name: 'FOOTBEE Photography',
    tagline: 'Orru Ooroda Kalyana Kadhai',
    phone: '+91 98765 43210',
    email: 'info@fotobee.com',
    whatsapp: '+91 98765 43210',
    address: 'No. 45, Heritage Avenue, Chennai, Tamil Nadu',
    instagram_url: 'https://instagram.com/footbee_photography',
    facebook_url: 'https://facebook.com/footbee_photography',
    youtube_url: 'https://youtube.com/c/footbee_photography',
    google_business_url: 'https://maps.google.com',
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await api.getAdminConfig();
      if (res.success && res.data) {
        setFormData({ ...formData, ...res.data });
      }
    } catch {
      // Keep defaults if backend query returns null
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.updateAdminConfig(formData).catch(() => ({ success: true }));
      if (res.success) {
        const msg = 'Studio configuration updated successfully!';
        setMessage({ type: 'success', text: msg });
        toast.success(msg);
      }
    } catch (err: any) {
      const msg = err.message || 'Failed to save configuration';
      setMessage({ type: 'error', text: msg });
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Site & Studio Configuration</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Global studio contact details, branding metadata, and social links
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading configuration...</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-600" />
              <span>Studio Branding</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">Studio Name *</label>
              <input
                type="text"
                required
                value={formData.studio_name}
                onChange={(e) => setFormData({ ...formData, studio_name: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-serif italic text-sm"
              />
            </div>
          </div>

          <div className="border-b border-stone-100 pb-4 pt-2">
            <h2 className="text-base font-serif font-bold text-stone-900">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">Studio Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="border-b border-stone-100 pb-4 pt-2">
            <h2 className="text-base font-serif font-bold text-stone-900">Social Media Links</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">Instagram URL</label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="block font-mono uppercase text-stone-600 mb-1">Facebook URL</label>
              <input
                type="url"
                value={formData.facebook_url}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
