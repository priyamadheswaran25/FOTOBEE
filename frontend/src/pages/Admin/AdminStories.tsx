import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Plus, Edit3, Trash2, X, Upload, AlertCircle, BookOpen } from 'lucide-react';

import { useToast } from '../../context/ToastContext';

export const AdminStories: React.FC = () => {
  const toast = useToast();
  const [stories, setStories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    title_en: '',
    title_ta: '',
    subtitle_en: '',
    subtitle_ta: '',
    excerpt_en: '',
    excerpt_ta: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    hero_image: '',
    category_id: '',
    portfolio_id: '',
    is_featured: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [storyRes, catRes] = await Promise.all([
        api.getAdminStories(),
        api.getAdminCategories(),
      ]);
      if (storyRes.success) setStories(storyRes.data || []);
      if (catRes.success) setCategories(catRes.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load stories');
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
        setFormData({ ...formData, hero_image: res.data.url });
        toast.success('Hero cover image uploaded!');
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
        title_en: item.title_en || '',
        title_ta: item.title_ta || '',
        subtitle_en: item.subtitle_en || '',
        subtitle_ta: item.subtitle_ta || '',
        excerpt_en: item.quote_en || item.excerpt_en || '',
        excerpt_ta: item.quote_ta || item.excerpt_ta || '',
        date: item.event_date ? new Date(item.event_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        location: item.location_en || item.location || '',
        hero_image: item.hero_image_path || item.hero_image || '',
        category_id: item.category_id || (categories[0]?.id || ''),
        portfolio_id: item.portfolio_id || '',
        is_featured: !!item.is_featured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        slug: '',
        title_en: '',
        title_ta: '',
        subtitle_en: '',
        subtitle_ta: '',
        excerpt_en: '',
        excerpt_ta: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        hero_image: '',
        category_id: categories[0]?.id || '',
        portfolio_id: '',
        is_featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        slug: formData.slug,
        category_id: formData.category_id,
        name_en: formData.title_en,
        name_ta: formData.title_ta || null,
        title_en: formData.title_en,
        title_ta: formData.title_ta || null,
        subtitle_en: formData.subtitle_en || formData.title_en,
        subtitle_ta: formData.subtitle_ta || null,
        location_en: formData.location || 'Unknown',
        location_ta: null,
        event_date: formData.date || new Date().toISOString(),
        hero_image_path: formData.hero_image || 'https://via.placeholder.com/800x600',
        quote_en: formData.excerpt_en || 'A beautiful story.',
        quote_ta: formData.excerpt_ta || null,
        is_active: true,
      };

      if (editingItem) {
        await api.updateStory(editingItem.id, payload).catch((err) => { throw err; });
        setStories((prev) =>
          prev.map((s) => (s.id === editingItem.id ? { ...s, ...payload } : s))
        );
        toast.success('Story journal entry updated!');
      } else {
        const newStory = { id: `st-${Date.now()}`, ...payload };
        await api.createStory(payload).catch((err) => { throw err; });
        setStories((prev) => [...prev, newStory]);
        toast.success('New story journal published!');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(`Save notice: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this story entry?')) return;
    try {
      await api.deleteStory(id).catch(() => {});
      setStories((prev) => prev.filter((s) => s.id !== id));
      toast.info('Story entry deleted.');
    } catch (err: any) {
      toast.error(`Delete notice: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Story Journal Management</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Publish wedding editorial stories, photography journals, and photo essays
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Story</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading stories...</div>
      ) : stories.length === 0 ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">No story journal entries found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((st) => (
            <div
              key={st.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-400 transition shadow-sm"
            >
              <div>
                <div className="h-44 bg-stone-100 relative overflow-hidden">
                  {st.hero_image_path || st.hero_image ? (
                    <img src={st.hero_image_path || st.hero_image} alt={st.title_en} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                  {st.is_featured && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full shadow">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                    {st.event_date || st.date ? new Date(st.event_date || st.date).toLocaleDateString() : 'Invalid Date'} • {st.location_en || st.location || 'Tamil Nadu'}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mt-1">{st.title_en}</h3>
                  {st.title_ta && <p className="text-xs text-stone-500 font-tamil mt-0.5">{st.title_ta}</p>}
                  {st.excerpt_en && (
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2">{st.excerpt_en}</p>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-stone-100 flex items-center justify-end gap-2 bg-stone-50/50">
                <button
                  onClick={() => handleOpenModal(st)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition flex items-center gap-1 px-2.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(st.id)}
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
              {editingItem ? 'Edit Story Entry' : 'Create Story Entry'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="sanjay-harini-chettinad"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Title (EN) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="Sanjay & Harini"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Title (TA)</label>
                  <input
                    type="text"
                    value={formData.title_ta}
                    onChange={(e) => setFormData({ ...formData, title_ta: e.target.value })}
                    placeholder="சஞ்சய் & ஹரிணி"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-tamil"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Chettinad Palace, Karaikudi"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Hero Image URL / Upload</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.hero_image}
                    onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                  <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 rounded-lg cursor-pointer flex items-center gap-1 font-mono">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? '...' : 'Upload'}</span>
                    <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Excerpt Story (EN)</label>
                <textarea
                  rows={3}
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                  placeholder="A romantic celebration amidst traditional Chettinad architecture..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded border-stone-300 bg-stone-50 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="is_featured" className="font-mono text-stone-700">
                  Feature on Homepage Story Highlights
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
                  Save Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
