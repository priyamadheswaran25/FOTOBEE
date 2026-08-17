import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Plus, Edit3, Trash2, X, Check, AlertCircle } from 'lucide-react';

import { useToast } from '../../context/ToastContext';

export const AdminPackages: React.FC = () => {
  const toast = useToast();
  const [packages, setPackages] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name_en: '',
    name_ta: '',
    price_en: '',
    price_ta: '',
    badge_en: '',
    badge_ta: '',
    is_popular: false,
    portfolio_id: '',
    order_index: 0,
    features: [
      { text_en: 'Full Day Coverage', text_ta: 'முழு நாள் சேவை', is_included: true, order_index: 0 },
    ],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pkgRes, catRes] = await Promise.all([
        api.getAdminPackages(),
        api.getAdminPortfolios(),
      ]);
      if (pkgRes.success) setPackages(pkgRes.data || []);
      if (catRes.success) setPortfolios(catRes.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name_en: item.name_en || '',
        name_ta: item.name_ta || '',
        price_en: item.subtitle_en || item.price_en || '',
        price_ta: item.subtitle_ta || item.price_ta || '',
        badge_en: item.description_en || item.badge_en || '',
        badge_ta: item.description_ta || item.badge_ta || '',
        is_popular: !!item.is_popular,
        portfolio_id: item.portfolio_id || (portfolios[0]?.id || ''),
        order_index: item.order_index ?? 0,
        features: item.features && item.features.length > 0 ? item.features.map((f: any) => ({ ...f, text_en: f.feature_en || f.text_en, text_ta: f.feature_ta || f.text_ta })) : [],
      });
    } else {
      setEditingItem(null);
      setFormData({
        name_en: '',
        name_ta: '',
        price_en: '',
        price_ta: '',
        badge_en: '',
        badge_ta: '',
        is_popular: false,
        portfolio_id: portfolios[0]?.id || '',
        order_index: packages.length,
        features: [{ text_en: '', text_ta: '', is_included: true, order_index: 0 }],
      });
    }
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [
        ...formData.features,
        { text_en: '', text_ta: '', is_included: true, order_index: formData.features.length },
      ],
    });
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleFeatureChange = (index: number, key: string, value: any) => {
    const updated = [...formData.features];
    updated[index] = { ...updated[index], [key]: value };
    setFormData({ ...formData, features: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        slug: `pkg-${formData.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name_en: formData.name_en,
        name_ta: formData.name_ta || null,
        subtitle_en: formData.price_en || 'Contact for price',
        subtitle_ta: formData.price_ta || null,
        description_en: formData.badge_en || 'Package',
        description_ta: formData.badge_ta || null,
        is_popular: formData.is_popular,
        is_active: true,
        order_index: formData.order_index || 0,
        features: formData.features.map((f: any) => ({
          feature_en: f.text_en || 'Feature',
          feature_ta: f.text_ta || null,
          order_index: f.order_index || 0,
        })),
      };

      if (editingItem) {
        await api.updatePackage(editingItem.id, payload).catch((err) => { throw err; });
        setPackages((prev) =>
          prev.map((p) => (p.id === editingItem.id ? { ...p, ...payload } : p))
        );
        toast.success('Package updated successfully!');
      } else {
        const newPkg = { id: `pkg-${Date.now()}`, ...payload };
        await api.createPackage(payload).catch((err) => { throw err; });
        setPackages((prev) => [...prev, newPkg]);
        toast.success('New package created!');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(`Save notice: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this pricing package?')) return;
    try {
      await api.deletePackage(id).catch(() => {});
      setPackages((prev) => prev.filter((p) => p.id !== id));
      toast.info('Pricing package deleted.');
    } catch (err: any) {
      toast.error(`Delete notice: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Package Management</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Configure pricing tiers, photography packages, and feature lists
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading packages...</div>
      ) : packages.length === 0 ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">No packages found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white border rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-400 transition relative overflow-hidden shadow-sm ${
                pkg.is_popular ? 'border-amber-500 shadow-md ring-1 ring-amber-500/20' : 'border-stone-200'
              }`}
            >
              {pkg.is_popular && (
                <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full">
                  Popular
                </div>
              )}

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                  {pkg.description_en || pkg.badge_en || 'Standard Package'}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">{pkg.name_en}</h3>
                <p className="text-2xl font-serif font-bold text-amber-600 mt-2">{pkg.subtitle_en || pkg.price_en}</p>

                <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                  {pkg.features?.map((feat: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{feat.feature_en || feat.text_en}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
                <button
                  onClick={() => handleOpenModal(pkg)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition flex items-center gap-1 px-2.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs transition flex items-center gap-1 px-2.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative text-stone-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-bold text-stone-900">
              {editingItem ? 'Edit Package' : 'Create Package'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Package Name (EN) *</label>
                  <input
                    type="text"
                    required
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    placeholder="Grand Wedding"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Package Name (TA)</label>
                  <input
                    type="text"
                    value={formData.name_ta}
                    onChange={(e) => setFormData({ ...formData, name_ta: e.target.value })}
                    placeholder="பிரமாண்ட திருமணம்"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-tamil"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Price Label (EN) *</label>
                  <input
                    type="text"
                    required
                    value={formData.price_en}
                    onChange={(e) => setFormData({ ...formData, price_en: e.target.value })}
                    placeholder="₹75,000"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Price Label (TA)</label>
                  <input
                    type="text"
                    value={formData.price_ta}
                    onChange={(e) => setFormData({ ...formData, price_ta: e.target.value })}
                    placeholder="₹75,000"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Badge (EN)</label>
                  <input
                    type="text"
                    value={formData.badge_en}
                    onChange={(e) => setFormData({ ...formData, badge_en: e.target.value })}
                    placeholder="Most Popular"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Portfolio</label>
                  <select
                    value={formData.portfolio_id}
                    onChange={(e) => setFormData({ ...formData, portfolio_id: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">None / General</option>
                    {portfolios.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_popular"
                  checked={formData.is_popular}
                  onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                  className="rounded border-stone-300 bg-stone-50 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="is_popular" className="font-mono text-stone-700">
                  Highlight as Popular Package
                </label>
              </div>

              {/* Features Builder */}
              <div className="pt-3 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-mono uppercase text-amber-700 font-bold">Package Features</label>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-[11px] font-mono text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3 h-3" /> Add Feature
                  </button>
                </div>

                {formData.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200">
                    <input
                      type="text"
                      placeholder="Feature in English"
                      value={feat.text_en}
                      onChange={(e) => handleFeatureChange(idx, 'text_en', e.target.value)}
                      className="flex-1 bg-transparent border-b border-stone-300 px-2 py-1 text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-1 text-stone-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold rounded-xl transition"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
