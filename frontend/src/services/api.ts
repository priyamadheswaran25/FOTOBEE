const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('footbee_admin_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('footbee_admin_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('footbee_admin_token');
  localStorage.removeItem('footbee_admin_user');
};

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken();
      window.location.href = '/admin/login';
    }
    const errorMsg = data?.error?.message || data?.error || data?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    return apiFetch<{ success: boolean; data: { token: string; admin: any } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Public Endpoints
  // Categories
  getCategories: () => apiFetch<any[]>('/categories'),
  getCategoryById: (id: string) => apiFetch<any>(`/categories/${id}`),

  // Portfolios
  getPortfolios: () => apiFetch<any[]>('/portfolios'),
  getPortfolioById: (id: string) => apiFetch<any>(`/portfolios/${id}`),

  getServices: () => apiFetch<any[]>('/services'),
  getPackages: () => apiFetch<any[]>('/packages'),
  getStories: () => apiFetch<any[]>('/stories'),
  getStoryBySlug: (slug: string) => apiFetch<any>(`/stories/${slug}`),
  getTestimonials: () => apiFetch<any[]>('/testimonials'),
  getConfig: async () => {
    const res = await apiFetch<any>('/config').catch(() => null);
    // Dynamically import static config to avoid circular dependencies if any
    const { siteConfig: staticConfig } = await import('../data/siteConfig');
    if (!res) return staticConfig;
    
    return {
      ...staticConfig,
      email: res.email || staticConfig.email,
      phone: res.phone || staticConfig.phone,
      whatsapp: {
        ...staticConfig.whatsapp,
        number: res.whatsapp_number || staticConfig.whatsapp.number,
        prefilledMessage: res.whatsapp_message_en || staticConfig.whatsapp.prefilledMessage,
      },
      socials: {
        ...staticConfig.socials,
        instagram: res.instagram_url || staticConfig.socials.instagram,
        facebook: res.facebook_url || staticConfig.socials.facebook,
        youtube: res.youtube_url || staticConfig.socials.youtube,
      },
      address: res.address_en || staticConfig.address,
      stats: (res.stats && res.stats.length > 0) ? res.stats : staticConfig.stats,
    };
  },
  submitInquiry: (data: any) => apiFetch<any>('/inquiries', { method: 'POST', body: JSON.stringify(data) }),

  // Admin Endpoints
  getAdminServices: () => apiFetch<{ success: boolean; data: any[] }>('/admin/services'),
  createService: (data: any) => apiFetch<{ success: boolean; data: any }>('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: string, data: any) => apiFetch<{ success: boolean; data: any }>(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: string) => apiFetch<{ success: boolean }>(`/admin/services/${id}`, { method: 'DELETE' }),

  getAdminPackages: () => apiFetch<{ success: boolean; data: any[] }>('/admin/packages'),
  createPackage: (data: any) => apiFetch<{ success: boolean; data: any }>('/admin/packages', { method: 'POST', body: JSON.stringify(data) }),
  updatePackage: (id: string, data: any) => apiFetch<{ success: boolean; data: any }>(`/admin/packages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePackage: (id: string) => apiFetch<{ success: boolean }>(`/admin/packages/${id}`, { method: 'DELETE' }),

  getAdminStories: () => apiFetch<{ success: boolean; data: any[] }>('/admin/stories'),
  createStory: (data: any) => apiFetch<{ success: boolean; data: any }>('/admin/stories', { method: 'POST', body: JSON.stringify(data) }),
  updateStory: (id: string, data: any) => apiFetch<{ success: boolean; data: any }>(`/admin/stories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStory: (id: string) => apiFetch<{ success: boolean }>(`/admin/stories/${id}`, { method: 'DELETE' }),

  getAdminTestimonials: () => apiFetch<{ success: boolean; data: any[] }>('/admin/testimonials'),
  createTestimonial: (data: any) => apiFetch<{ success: boolean; data: any }>('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: string, data: any) => apiFetch<{ success: boolean; data: any }>(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: string) => apiFetch<{ success: boolean }>(`/admin/testimonials/${id}`, { method: 'DELETE' }),

  getAdminGallery: () => apiFetch<{ success: boolean; data: any[] }>('/admin/portfolios'),
  getAdminCategories: () => apiFetch<{ success: boolean; data: any[] }>('/admin/categories'),
  createCategory: (data: any) => apiFetch<{ success: boolean; data: any }>('/admin/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: string, data: any) => apiFetch<{ success: boolean; data: any }>(`/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: string) => apiFetch<{ success: boolean }>(`/admin/categories/${id}`, { method: 'DELETE' }),

  // Portfolios (Admin)
  getAdminPortfolios: () => apiFetch<{ success: boolean; data: any[] }>('/admin/portfolios'),
  createPortfolio: (data: any) => apiFetch<{ success: boolean; data: any }>('/admin/portfolios', { method: 'POST', body: JSON.stringify(data) }),
  updatePortfolio: (id: string, data: any) => apiFetch<{ success: boolean; data: any }>(`/admin/portfolios/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePortfolio: (id: string) => apiFetch<{ success: boolean }>(`/admin/portfolios/${id}`, { method: 'DELETE' }),

  // Admin Endpoints - Inquiries
  getAdminInquiries: () => apiFetch<{ success: boolean; data: any[] }>('/admin/inquiries'),
  updateInquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Closed') =>
    apiFetch<{ success: boolean; data: any }>(`/admin/inquiries/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Admin Endpoints - Config
  getAdminConfig: () => apiFetch<{ success: boolean; data: any }>('/admin/config'),
  updateAdminConfig: (data: any) => apiFetch<{ success: boolean; data: any }>('/admin/config', { method: 'PUT', body: JSON.stringify(data) }),

  // Upload File
  uploadImage: async (file: File, module?: string) => {
    const formData = new FormData();
    formData.append('image', file);
    const url = module ? `/admin/upload?module=${module}` : '/admin/upload';
    return apiFetch<{ success: boolean; data: { url: string } }>(url, {
      method: 'POST',
      body: formData,
    });
  },
  uploadFile: async (file: File, module?: string) => {
    const formData = new FormData();
    formData.append('image', file);
    const url = module ? `/admin/upload?module=${module}` : '/admin/upload';
    return apiFetch<{ success: boolean; data: { url: string } }>(url, {
      method: 'POST',
      body: formData,
    });
  },
};
