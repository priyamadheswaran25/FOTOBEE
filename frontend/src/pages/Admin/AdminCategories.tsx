import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Plus, Edit3, Trash2, X, AlertCircle, Sparkles, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const defaultCategoriesSeed = [
  { id: 'cat-1', slug: 'weddings', name_en: 'Weddings', name_ta: 'திருமணங்கள்', description_en: 'Traditional and candid South Indian wedding storytelling.', order_index: 0 },
  { id: 'cat-2', slug: 'pre-weddings', name_en: 'Pre-Weddings', name_ta: 'நிச்சயதார்த்தம்', description_en: 'Romantic pre-wedding outdoor and palace shoots.', order_index: 1 },
  { id: 'cat-3', slug: 'candid-photography', name_en: 'Candid Photography', name_ta: 'இயல்பான புகைப்படங்கள்', description_en: 'Unscripted, genuine emotional moments captured naturally.', order_index: 2 },
  { id: 'cat-4', slug: 'receptions-parties', name_en: 'Receptions & Parties', name_ta: 'வரவேற்பு விழா', description_en: 'Grand reception galas and sangeet celebrations.', order_index: 3 },
  { id: 'cat-5', slug: 'portraits-couples', name_en: 'Portraits & Couples', name_ta: 'அழகிய ஜோடிகள்', description_en: 'Editorial couple portraits and traditional attire.', order_index: 4 },
  { id: 'cat-6', slug: 'baby-maternity', name_en: 'Baby & Maternity', name_ta: 'குழந்தை பிறப்பு', description_en: 'Newborn, baby bump, and family portrait sessions.', order_index: 5 },
  { id: 'cat-7', slug: 'cultural-events', name_en: 'Cultural Events', name_ta: 'கோயில் திருவிழாக்கள்', description_en: 'Village temple festivals, rituals, and heritage.', order_index: 6 },
];

export const AdminCategories: React.FC = () => {
  const toast = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    name_en: '',
    name_ta: '',
    description_en: '',
    description_ta: '',
    order_index: 0,
    image_url: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAdminCategories();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setCategories(res.data);
      } else {
        setCategories(defaultCategoriesSeed);
      }
    } catch {
      setCategories(defaultCategoriesSeed);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDefaults = async () => {
    setLoading(true);
    try {
      for (const cat of defaultCategoriesSeed) {
        await api.createCategory(cat).catch(() => {});
      }
      loadCategories();
      toast.success('Default photography categories seeded!');
    } catch (err: any) {
      toast.error(`Seeding notice: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadFile(file);
      if (res.success && res.data.url) {
        setFormData({ ...formData, image_url: res.data.url });
        toast.success('Image uploaded successfully!');
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
        slug: item.slug || '',
        name_en: item.name_en || '',
        name_ta: item.name_ta || '',
        description_en: item.description_en || '',
        description_ta: item.description_ta || '',
        order_index: item.order_index ?? 0,
        image_url: item.image_url || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        slug: '',
        name_en: '',
        name_ta: '',
        description_en: '',
        description_ta: '',
        order_index: categories.length,
        image_url: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateCategory(editingItem.id, formData).catch(() => {});
        setCategories((prev) =>
          prev.map((c) => (c.id === editingItem.id ? { ...c, ...formData } : c))
        );
        toast.success('Portfolio updated successfully!');
      } else {
        const newCat = { id: `cat-${Date.now()}`, ...formData };
        await api.createCategory(formData).catch(() => {});
        setCategories((prev) => [...prev, newCat]);
        toast.success('New portfolio created!');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(`Save notice: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;
    try {
      await api.deleteCategory(id).catch(() => {});
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.info('Portfolio deleted.');
    } catch (err: any) {
      toast.error(`Delete notice: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Portfolio Management</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Organize photography stories and gallery categories ({categories.length} active categories)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedDefaults}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-mono text-xs rounded-xl border border-stone-300 transition cursor-pointer"
            title="Reset to default photography categories"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Seed Default Categories</span>
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Portfolio</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-400/50 transition shadow-sm"
            >
              <div className="h-32 bg-stone-100 relative overflow-hidden rounded-t-lg -mx-5 -mt-5 mb-4">
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.name_en} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                    Slug: {cat.slug}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">Order: {cat.order_index}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900 mt-3">{cat.name_en}</h3>
                {cat.name_ta && <p className="text-xs text-stone-500 mt-0.5 font-tamil">{cat.name_ta}</p>}
                {cat.description_en && (
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">{cat.description_en}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => handleOpenModal(cat)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition flex items-center gap-1 px-2.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
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
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative text-stone-900">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-bold text-stone-900">
              {editingItem ? 'Edit Portfolio' : 'Create Portfolio'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="wedding-photography"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">English Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="Wedding Photography"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Tamil Name</label>
                <input
                  type="text"
                  value={formData.name_ta}
                  onChange={(e) => setFormData({ ...formData, name_ta: e.target.value })}
                  placeholder="திருமண புகைப்படம்"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-tamil"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Description (EN)</label>
                <textarea
                  rows={2}
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  placeholder="Capturing timeless moments..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Order Index</label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Image URL / Upload</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                  <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 rounded-lg cursor-pointer flex items-center gap-1 font-mono">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? '...' : 'Upload'}</span>
                    <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-stone-100">
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
                  Save Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
