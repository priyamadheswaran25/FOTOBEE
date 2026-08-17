import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import {
  MessageSquare,
  Package,
  BookOpen,
  Image as ImageIcon,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState({
    inquiries: 0,
    packages: 0,
    stories: 0,
    gallery: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [inquiriesRes, packagesRes, storiesRes, galleryRes] = await Promise.allSettled([
        api.getAdminInquiries(),
        api.getAdminPackages(),
        api.getAdminStories(),
        api.getAdminGallery(),
      ]);

      const inquiriesData = inquiriesRes.status === 'fulfilled' && inquiriesRes.value.success ? inquiriesRes.value.data : [];
      const packagesData = packagesRes.status === 'fulfilled' && packagesRes.value.success ? packagesRes.value.data : [];
      const storiesData = storiesRes.status === 'fulfilled' && storiesRes.value.success ? storiesRes.value.data : [];
      const galleryData = galleryRes.status === 'fulfilled' && galleryRes.value.success ? galleryRes.value.data : [];

      setStats({
        inquiries: inquiriesData.length,
        packages: packagesData.length,
        stories: storiesData.length,
        gallery: galleryData.length,
      });

      setRecentInquiries(inquiriesData.slice(0, 5));
    } catch {
      setError('Unable to load full dashboard metrics from backend. Make sure the server is online.');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Inquiries', value: stats.inquiries, icon: MessageSquare, path: '/admin/inquiries', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { title: 'Packages', value: stats.packages, icon: Package, path: '/admin/packages', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    { title: 'Story Entries', value: stats.stories, icon: BookOpen, path: '/admin/stories', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    { title: 'Gallery Photos', value: stats.gallery, icon: ImageIcon, path: '/admin/gallery', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#181816] text-stone-100 p-6 rounded-2xl shadow-md border border-stone-800">
        <h1 className="text-2xl font-serif font-bold text-stone-100">Studio Dashboard</h1>
        <p className="text-xs font-mono text-stone-400 mt-1">
          Welcome to FOOTBEE Photography Administration & Content Management
        </p>
      </div>

      {error && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-900 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              to={card.path}
              className="bg-white border border-stone-200/80 hover:border-amber-500/40 p-5 rounded-2xl transition group relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${card.bg} ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-serif font-bold text-stone-900">
                  {loading ? '...' : card.value}
                </p>
                <p className="text-xs font-mono text-stone-500 mt-1 uppercase tracking-wider">
                  {card.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Client Booking Requests */}
      <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">Recent Inquiries</h2>
            <p className="text-xs font-mono text-stone-500 mt-0.5">Latest client photography bookings</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-mono text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-stone-400 text-xs font-mono">Loading inquiries...</div>
        ) : recentInquiries.length === 0 ? (
          <div className="py-12 text-center text-stone-400 text-xs font-mono">
            No inquiries recorded yet. Test backend server connection or send a booking request.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-mono uppercase tracking-wider bg-stone-50/50">
                  <th className="pb-3 px-3">Client Name</th>
                  <th className="pb-3 px-3">Event Type</th>
                  <th className="pb-3 px-3">Event Date</th>
                  <th className="pb-3 px-3">Location</th>
                  <th className="pb-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-50 transition">
                    <td className="py-3.5 px-3 font-medium text-stone-900">{inq.full_name}</td>
                    <td className="py-3.5 px-3 text-stone-600">{inq.event_type}</td>
                    <td className="py-3.5 px-3 text-stone-600 font-mono">
                      {new Date(inq.event_date).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-3 text-stone-600">{inq.location}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          inq.status === 'New'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {inq.status === 'New' && <Clock className="w-3 h-3" />}
                        {inq.status === 'Contacted' && <MessageSquare className="w-3 h-3" />}
                        {inq.status === 'Closed' && <CheckCircle2 className="w-3 h-3" />}
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
