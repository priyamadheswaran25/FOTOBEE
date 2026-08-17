import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Plus, Edit3, Trash2, X, Star, Quote, AlertCircle } from 'lucide-react';

import { useToast } from '../../context/ToastContext';

export const AdminTestimonials: React.FC = () => {
  const toast = useToast();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    client_name_en: '',
    client_name_ta: '',
    role_en: 'Bride & Groom',
    role_ta: 'மணமக்கள்',
    quote_en: '',
    quote_ta: '',
    rating: 5,
    event_type: 'Wedding Photography',
    location: 'Chennai',
    image_url: '',
    order_index: 0,
    is_featured: false,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAdminTestimonials();
      if (res.success) {
        setTestimonials(res.data || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        client_name_en: item.client_name_en || '',
        client_name_ta: item.client_name_ta || '',
        role_en: item.event_type_en || item.role_en || 'Bride & Groom',
        role_ta: item.event_type_ta || item.role_ta || 'மணமக்கள்',
        quote_en: item.review_en || item.quote_en || '',
        quote_ta: item.review_ta || item.quote_ta || '',
        rating: item.rating ?? 5,
        event_type: item.event_type_en || item.event_type || 'Wedding Photography',
        location: item.location_en || item.location || 'Chennai',
        image_url: item.avatar_path || item.image_url || '',
        order_index: item.order_index ?? 0,
        is_featured: !!item.is_featured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        client_name_en: '',
        client_name_ta: '',
        role_en: 'Bride & Groom',
        role_ta: 'மணமக்கள்',
        quote_en: '',
        quote_ta: '',
        rating: 5,
        event_type: 'Wedding Photography',
        location: 'Chennai',
        image_url: '',
        order_index: testimonials.length,
        is_featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        client_name_en: formData.client_name_en,
        client_name_ta: formData.client_name_ta || null,
        event_type_en: formData.role_en,
        event_type_ta: formData.role_ta || null,
        location_en: formData.location,
        location_ta: null,
        review_en: formData.quote_en,
        review_ta: formData.quote_ta || null,
        rating: formData.rating,
        avatar_path: formData.image_url || 'default-avatar',
        is_active: true,
      };

      if (editingItem) {
        await api.updateTestimonial(editingItem.id, payload).catch((err) => { throw err; });
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editingItem.id ? { ...t, ...payload } : t))
        );
        toast.success('Client review updated!');
      } else {
        const newTest = { id: `test-${Date.now()}`, ...payload };
        await api.createTestimonial(payload).catch((err) => { throw err; });
        setTestimonials((prev) => [...prev, newTest]);
        toast.success('New client review added!');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(`Save notice: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client review?')) return;
    try {
      await api.deleteTestimonial(id).catch(() => {});
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.info('Client review deleted.');
    } catch (err: any) {
      toast.error(`Delete notice: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Client Reviews</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Manage client testimonials, star ratings, and homepage review highlights
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading reviews...</div>
      ) : testimonials.length === 0 ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">No client reviews found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-400 transition shadow-sm relative"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  {t.is_featured && (
                    <span className="bg-amber-500 text-stone-950 text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-3 relative">
                  <Quote className="w-6 h-6 text-stone-200 absolute -top-2 -left-1 -z-0" />
                  <p className="text-xs text-stone-700 italic relative z-10 font-serif">
                    "{t.review_en || t.quote_en}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-3">
                  {t.avatar_path || t.image_url ? (
                    <img src={t.avatar_path || t.image_url} alt={t.client_name_en} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center font-serif text-amber-700 font-bold">
                      {t.client_name_en?.charAt(0) || 'C'}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{t.client_name_en}</h4>
                    <p className="text-[10px] text-stone-500 font-mono">{t.event_type_en || t.role_en} • {t.location_en || t.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => handleOpenModal(t)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition flex items-center gap-1 px-2.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
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
              {editingItem ? 'Edit Review' : 'Add Client Review'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Client Name (EN) *</label>
                  <input
                    type="text"
                    required
                    value={formData.client_name_en}
                    onChange={(e) => setFormData({ ...formData, client_name_en: e.target.value })}
                    placeholder="Karthik & Priya"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Role (EN)</label>
                  <input
                    type="text"
                    value={formData.role_en}
                    onChange={(e) => setFormData({ ...formData, role_en: e.target.value })}
                    placeholder="Bride & Groom"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Testimonial Quote (EN) *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote_en}
                  onChange={(e) => setFormData({ ...formData, quote_en: e.target.value })}
                  placeholder="FOOTBEE captured our wedding moments with pure magic..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Star Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Chennai"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded border-stone-300 bg-stone-50 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="is_featured" className="font-mono text-stone-700">
                  Feature on Homepage Reviews Section
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
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
