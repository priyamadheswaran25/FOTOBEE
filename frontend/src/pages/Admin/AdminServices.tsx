import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Camera, Plus, Edit3, Trash2, X, AlertCircle, Sparkles, Upload } from 'lucide-react';

import { useToast } from '../../context/ToastContext';

const defaultServicesSeed = [
  { slug: 'traditional-photography', name_en: 'Traditional Photography', name_ta: 'பாரம்பரிய புகைப்படம்', description_en: 'Capture every important moment with timeless, detailed photographs that beautifully preserve your special occasions and memories.', image_path: 'Camera', order_index: 0 },
  { slug: 'traditional-videography', name_en: 'Traditional Videography', name_ta: 'பாரம்பரிய வீடியோ', description_en: 'Relive your memorable moments through professionally recorded videos that capture the complete flow, emotions, and highlights of your event.', image_path: 'Video', order_index: 1 },
  { slug: 'candid-photography', name_en: 'Candid Photography', name_ta: 'இயல்பான புகைப்படங்கள்', description_en: 'Natural emotions, genuine smiles, and unexpected moments—our candid photography captures your special memories as they truly happen.', image_path: 'Heart', order_index: 2 },
  { slug: 'candid-videography', name_en: 'Candid Videography', name_ta: 'இயல்பான வீடியோ', description_en: 'Experience your special moments all over again with cinematic candid videos that focus on real emotions, natural interactions, and unforgettable memories.', image_path: 'Film', order_index: 3 },
  { slug: 'drone-videography', name_en: 'Drone Videography', name_ta: 'ட்ரோன் வீடியோ', description_en: 'Get a stunning aerial perspective of your event, location, and celebrations with professional drone videography that adds a cinematic touch to your memories.', image_path: 'Plane', order_index: 4 },
  { slug: 'street-photography', name_en: 'Street Photography', name_ta: 'தெரு புகைப்படம்', description_en: 'Explore everyday life through authentic frames. Our street photography captures people, places, culture, emotions, and spontaneous moments.', image_path: 'MapPin', order_index: 5 },
  { slug: 'festival-photography', name_en: 'Festival Photography', name_ta: 'திருவிழா புகைப்படம்', description_en: 'Capture the colours, traditions, celebrations, emotions, and vibrant atmosphere of festivals with beautifully detailed photography.', image_path: 'Sparkles', order_index: 6 },
  { slug: 'travel-photography', name_en: 'Travel Photography', name_ta: 'பயண புகைப்படம்', description_en: 'Turn your journeys into lasting visual stories. We capture landscapes, people, culture, destinations, and memorable experiences throughout your travels.', image_path: 'Compass', order_index: 7 },
];

export const AdminServices: React.FC = () => {
  const toast = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    title_en: '',
    title_ta: '',
    short_description_en: '',
    short_description_ta: '',
    icon: 'Camera',
    order_index: 0,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAdminServices();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setServices(res.data);
      } else {
        // Automatically seed defaults if database is empty
        handleSeedDefaults(true);
      }
    } catch (err: any) {
      handleSeedDefaults(true);
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
        setFormData({ ...formData, icon: res.data.url });
        toast.success('Service icon/image uploaded!');
      }
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSeedDefaults = async (silent = false) => {
    if (!silent && !window.confirm('This will delete current services and completely restore the original defaults. Continue?')) return;
    setLoading(true);
    try {
      // 1. Fetch current services
      const res = await api.getAdminServices();
      if (res.success && Array.isArray(res.data)) {
        // 2. Delete all existing ones
        for (const existing of res.data) {
          await api.deleteService(existing.id).catch(() => {});
        }
      }
      // 3. Insert defaults
      for (const srv of defaultServicesSeed) {
        await api.createService({ ...srv, is_active: true }).catch(() => {});
      }
      const newRes = await api.getAdminServices();
      if (newRes.success && Array.isArray(newRes.data)) {
         setServices(newRes.data);
      }
      if (!silent) toast.success('Default services completely restored!');
    } catch (err: any) {
      if (!silent) toast.error(`Seeding error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        slug: item.slug || '',
        title_en: item.name_en || item.title_en || '',
        title_ta: item.name_ta || item.title_ta || '',
        short_description_en: item.description_en || item.short_description_en || '',
        short_description_ta: item.description_ta || item.short_description_ta || '',
        icon: item.image_path || item.icon || 'Camera',
        order_index: item.order_index ?? 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        slug: '',
        title_en: '',
        title_ta: '',
        short_description_en: '',
        short_description_ta: '',
        icon: 'Camera',
        order_index: services.length,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        slug: formData.slug,
        name_en: formData.title_en,
        name_ta: formData.title_ta || null,
        description_en: formData.short_description_en || 'Service description',
        description_ta: formData.short_description_ta || null,
        image_path: formData.icon || 'Camera',
        is_active: true,
        order_index: formData.order_index || 0,
      };

      if (editingItem) {
        await api.updateService(editingItem.id, payload).catch((err) => { throw err; });
        setServices((prev) =>
          prev.map((s) => (s.id === editingItem.id ? { ...s, ...payload } : s))
        );
        toast.success('Service updated successfully!');
      } else {
        const newSrv = { id: `srv-${Date.now()}`, ...payload };
        await api.createService(payload).catch((err) => { throw err; });
        setServices((prev) => [...prev, newSrv]);
        toast.success('New service created!');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(`Save notice: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.deleteService(id).catch(() => {});
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.info('Service deleted.');
    } catch (err: any) {
      toast.error(`Delete notice: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Services Management</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Manage photography & videography service offerings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSeedDefaults()}
            className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-mono text-xs rounded-xl border border-stone-300 transition cursor-pointer"
            title="Reset to default frontend services"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Seed Default Services</span>
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="py-16 text-center text-stone-400 text-xs font-mono">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-400/50 transition shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Camera className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">Order: {srv.order_index}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900 mt-3">{srv.name_en || srv.title_en}</h3>
                {(srv.name_ta || srv.title_ta) && <p className="text-xs text-stone-500 mt-0.5 font-tamil">{srv.name_ta || srv.title_ta}</p>}
                {(srv.description_en || srv.short_description_en) && (
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">{srv.description_en || srv.short_description_en}</p>
                )}
                <div className="mt-3">
                  <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-1 rounded border border-stone-200">
                    /{srv.slug}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  onClick={() => handleOpenModal(srv)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition flex items-center gap-1 px-2.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
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
              {editingItem ? 'Edit Service' : 'Create Service'}
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
                    placeholder="candid-photography"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Title (EN) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="Candid Photography"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-stone-600 mb-1">Title (TA)</label>
                  <input
                    type="text"
                    value={formData.title_ta}
                    onChange={(e) => setFormData({ ...formData, title_ta: e.target.value })}
                    placeholder="இயல்பான புகைப்படங்கள்"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-tamil"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Icon Name / Image Upload</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Camera or https://..."
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 rounded-lg cursor-pointer flex items-center gap-1 font-mono">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? '...' : 'Upload'}</span>
                    <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-stone-600 mb-1">Description (EN)</label>
                <textarea
                  rows={3}
                  value={formData.short_description_en}
                  onChange={(e) => setFormData({ ...formData, short_description_en: e.target.value })}
                  placeholder="Unscripted, emotional moments..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-amber-500"
                />
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
