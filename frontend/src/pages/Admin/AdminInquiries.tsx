import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';

import { useToast } from '../../context/ToastContext';

export const AdminInquiries: React.FC = () => {
  const toast = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAdminInquiries();
      if (res.success) {
        setInquiries(res.data || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    setUpdatingId(id);
    try {
      const res = await api.updateInquiryStatus(id, newStatus);
      if (res.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
        toast.success(`Inquiry status updated to ${newStatus}`);
      }
    } catch (err: any) {
      toast.error(`Failed to update status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      inq.full_name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.event_type?.toLowerCase().includes(q) ||
      inq.location?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Booking Inquiries</h1>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Manage incoming photography requests and client communication
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search client, email, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-stone-400 shrink-0" />
          {['All', 'New', 'Contacted', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                statusFilter === st
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'bg-stone-100 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-stone-400 text-xs font-mono">Loading inquiries...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-16 text-center text-stone-400 text-xs font-mono">
            No inquiries match your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-mono uppercase tracking-wider">
                  <th className="p-3.5">Client Details</th>
                  <th className="p-3.5">Event Type</th>
                  <th className="p-3.5">Event Date</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Budget</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-50 transition">
                    <td className="p-3.5">
                      <p className="font-semibold text-stone-900">{inq.full_name}</p>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">{inq.email}</p>
                      <p className="text-[11px] text-stone-400 font-mono">{inq.phone}</p>
                    </td>
                    <td className="p-3.5 text-stone-700 font-medium">{inq.event_type}</td>
                    <td className="p-3.5 text-stone-600 font-mono">
                      {new Date(inq.event_date).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-stone-600">{inq.location}</td>
                    <td className="p-3.5 text-stone-600 font-mono">{inq.budget_range || '—'}</td>
                    <td className="p-3.5">
                      <select
                        disabled={updatingId === inq.id}
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value as 'New' | 'Contacted' | 'Closed')
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border focus:outline-none bg-white cursor-pointer ${
                          inq.status === 'New'
                            ? 'text-amber-800 border-amber-300 bg-amber-50'
                            : inq.status === 'Contacted'
                            ? 'text-blue-800 border-blue-300 bg-blue-50'
                            : 'text-emerald-800 border-emerald-300 bg-emerald-50'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative text-stone-900">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold">
                Inquiry Details
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 mt-1">
                {selectedInquiry.full_name}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="truncate">{selectedInquiry.email}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{selectedInquiry.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{new Date(selectedInquiry.event_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{selectedInquiry.location}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <DollarSign className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Budget: {selectedInquiry.budget_range || 'Not specified'}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <MessageSquare className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Type: {selectedInquiry.event_type}</span>
              </div>
            </div>

            {selectedInquiry.message && (
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <p className="text-xs font-mono uppercase text-stone-500 mb-1">Message Payload</p>
                <p className="text-xs text-stone-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <span className="text-xs font-mono text-stone-500">Status Update:</span>
              <div className="flex gap-2">
                {(['New', 'Contacted', 'Closed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono ${
                      selectedInquiry.status === st
                        ? 'bg-amber-500 text-stone-950 font-semibold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
