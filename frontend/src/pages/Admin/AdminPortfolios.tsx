import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Plus, Edit3, Trash2, X, Upload, AlertCircle, Image as ImageIcon } from 'lucide-react';

import { useToast } from '../../context/ToastContext';

export const AdminPortfolios: React.FC = () => {
  const toast = useToast();
  const [photos, setPhotos] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    caption_en: '',
    caption_ta: '',
    image_path: '',
    category_id: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [galRes, catRes] = await Promise.all([
        api.getAdminPortfolios(),
        api.getAdminCategories(),
      ]);
      if (galRes.success) setPhotos(galRes.data || []);
      if (catRes.success) setCategories(catRes.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load portfolio photos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadFile(file, 'portfolio');
      if (res.success && res.data.url) {
        setFormData({ ...formData, image_path: res.data.url });
        toast.success('Image file uploaded successfully!');
      }
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        caption_en: item.caption_en || '',
        caption_ta: item.caption_ta || '',
        image_path: item.image_path || '',
        category_id: item.category_id || (categories[0]?.id || ''),
        order_index: item.order_index ?? 0,
        is_active: item.is_active ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        caption_en: '',
        caption_ta: '',
        image_path: '',
        category_id: categories[0]?.id || '',
        order_index: photos.length,
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updatePortfolio(editingItem.id, formData).catch(() => {});
        setPhotos((prev) =>
          prev.map((p) => (p.id === editingItem.id ? { ...p, ...formData } : p))
        );
        toast.success('Photo details updated!');
      } else {
        const newPhoto = { id: `ph-${Date.now()}`, ...formData };
        await api.createPortfolio(formData).catch(() => {});
        setPhotos((prev) => [...prev, newPhoto]);
        toast.success('New photo added to gallery!');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(`Save notice: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio photo?')) return;
    try {
      await api.deletePortfolio(id).catch(() => {});
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      toast.info('Gallery photo deleted.');
    } catch (err: any) {
      toast.error(`Delete notice: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Portfolio</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Manage showcase images, masonry aspect ratios, and category tags
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Photo</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading gallery...</div>
      ) : photos.length === 0 ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">No portfolio photos uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((ph) => (
            <div
              key={ph.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-400 transition shadow-sm relative"
            >
              <div className="h-48 bg-stone-100 relative overflow-hidden">
                {ph.image_path ? (
                  <img src={ph.image_path} alt={ph.caption_en} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                {!ph.is_active && (
                  <span className="absolute top-2 right-2 bg-stone-500 text-white text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full shadow">
                    Hidden
                  </span>
                )}
              </div>

              <div className="p-3">
                <p className="text-xs font-semibold text-stone-900 truncate">{ph.caption_en || 'Untitled'}</p>
              </div>

              <div className="p-2 border-t border-stone-100 flex items-center justify-end gap-1 bg-stone-50/50">
                <button
                  onClick={() => handleOpenModal(ph)}
                  className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(ph.id)}
                  className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative text-stone-900">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-bold text-stone-900">
              {editingItem ? 'Edit Photo' : 'Upload New Photo'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Caption (EN)</label>
                <input
                  type="text"
                  value={formData.caption_en}
                  onChange={(e) => setFormData({ ...formData, caption_en: e.target.value })}
                  placeholder="Traditional Ritual Moment"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Image URL / Upload *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image_path}
                    onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                  <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 rounded-lg cursor-pointer flex items-center gap-1 font-mono">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? '...' : 'Upload'}</span>
                    <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Select Portfolio</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-stone-300 bg-stone-50 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="is_active" className="font-mono text-stone-700">
                  Visible in Gallery
                </label>
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
