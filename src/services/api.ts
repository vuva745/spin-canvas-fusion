// API service for connecting frontend to backend
const API_BASE_URL = 'http://localhost:3001';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  category?: string;
  tier?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Slot {
  id: string;
  slotNumber: number;
  companyId?: string;
  company?: Company;
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  companyId: string;
  slotId: string;
  amount: number;
  status: 'active' | 'won' | 'lost' | 'expired';
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  id: string;
  slotId: string;
  eventType: string;
  data: any;
  timestamp: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }

  // Companies
  async getCompanies(): Promise<Company[]> {
    return this.request('/api/companies');
  }

  async getCompany(id: string): Promise<Company> {
    return this.request(`/api/companies/${id}`);
  }

  async createCompany(company: Partial<Company>): Promise<Company> {
    return this.request('/api/companies', {
      method: 'POST',
      body: JSON.stringify(company),
    });
  }

  async updateCompany(id: string, company: Partial<Company>): Promise<Company> {
    return this.request(`/api/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(company),
    });
  }

  async deleteCompany(id: string): Promise<void> {
    return this.request(`/api/companies/${id}`, {
      method: 'DELETE',
    });
  }

  // Slots
  async getSlots(): Promise<Slot[]> {
    return this.request('/api/slots');
  }

  async getSlot(id: string): Promise<Slot> {
    return this.request(`/api/slots/${id}`);
  }

  async updateSlot(id: string, slot: Partial<Slot>): Promise<Slot> {
    return this.request(`/api/slots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(slot),
    });
  }

  async assignCompanyToSlot(slotId: string, companyId: string): Promise<Slot> {
    return this.request(`/api/slots/${slotId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ companyId }),
    });
  }

  async unassignSlot(slotId: string): Promise<Slot> {
    return this.request(`/api/slots/${slotId}/unassign`, {
      method: 'POST',
    });
  }

  // Bidding
  async getBids(): Promise<Bid[]> {
    return this.request('/api/bidding');
  }

  async getActiveBids(): Promise<Bid[]> {
    return this.request('/api/bidding/active');
  }

  async createBid(bid: Partial<Bid>): Promise<Bid> {
    return this.request('/api/bidding', {
      method: 'POST',
      body: JSON.stringify(bid),
    });
  }

  // Analytics
  async getAnalytics(): Promise<Analytics[]> {
    return this.request('/api/analytics');
  }

  async getSlotAnalytics(slotId: string): Promise<Analytics[]> {
    return this.request(`/api/analytics/slot/${slotId}`);
  }

  // AR Content
  async getARContent(): Promise<any[]> {
    return this.request('/api/ar');
  }

  async getARContentBySlot(slotId: string): Promise<any> {
    return this.request(`/api/ar/slot/${slotId}`);
  }

  // Hologram Effects
  async getHologramEffects(): Promise<any[]> {
    return this.request('/api/visual-effects/hologram');
  }

  // System Configuration
  async getSystemConfig(): Promise<any> {
    return this.request('/api/system-config');
  }

  async updateSystemConfig(config: any): Promise<any> {
    return this.request('/api/system-config', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }

  // Performance Monitoring
  async getPerformanceMetrics(): Promise<any> {
    return this.request('/api/performance-monitoring');
  }

  // Device Management
  async getDevices(): Promise<any[]> {
    return this.request('/api/devices');
  }

  async syncDevices(): Promise<any> {
    return this.request('/api/sync', {
      method: 'POST',
    });
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export the class for testing or custom instances
export default ApiService;
