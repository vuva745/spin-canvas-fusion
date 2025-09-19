import { useState, useEffect, useCallback } from 'react';
import { apiService, Company, Slot, Bid, Analytics } from '../services/api';

// Custom hook for API data management
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    showLoading: boolean = true
  ): Promise<T | null> => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('API call failed:', err);
      return null;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    handleApiCall,
  };
};

// Hook for companies data
export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { loading, error, handleApiCall } = useApi();

  const fetchCompanies = useCallback(async () => {
    const result = await handleApiCall(() => apiService.getCompanies());
    if (result) {
      setCompanies(result);
    }
  }, [handleApiCall]);

  const createCompany = useCallback(async (company: Partial<Company>) => {
    const result = await handleApiCall(() => apiService.createCompany(company));
    if (result) {
      setCompanies(prev => [...prev, result]);
    }
    return result;
  }, [handleApiCall]);

  const updateCompany = useCallback(async (id: string, company: Partial<Company>) => {
    const result = await handleApiCall(() => apiService.updateCompany(id, company));
    if (result) {
      setCompanies(prev => prev.map(c => c.id === id ? result : c));
    }
    return result;
  }, [handleApiCall]);

  const deleteCompany = useCallback(async (id: string) => {
    const result = await handleApiCall(() => apiService.deleteCompany(id));
    if (result !== null) {
      setCompanies(prev => prev.filter(c => c.id !== id));
    }
    return result;
  }, [handleApiCall]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};

// Hook for slots data
export const useSlots = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const { loading, error, handleApiCall } = useApi();

  const fetchSlots = useCallback(async () => {
    const result = await handleApiCall(() => apiService.getSlots());
    if (result) {
      setSlots(result);
    }
  }, [handleApiCall]);

  const updateSlot = useCallback(async (id: string, slot: Partial<Slot>) => {
    const result = await handleApiCall(() => apiService.updateSlot(id, slot));
    if (result) {
      setSlots(prev => prev.map(s => s.id === id ? result : s));
    }
    return result;
  }, [handleApiCall]);

  const assignCompanyToSlot = useCallback(async (slotId: string, companyId: string) => {
    const result = await handleApiCall(() => apiService.assignCompanyToSlot(slotId, companyId));
    if (result) {
      setSlots(prev => prev.map(s => s.id === slotId ? result : s));
    }
    return result;
  }, [handleApiCall]);

  const unassignSlot = useCallback(async (slotId: string) => {
    const result = await handleApiCall(() => apiService.unassignSlot(slotId));
    if (result) {
      setSlots(prev => prev.map(s => s.id === slotId ? result : s));
    }
    return result;
  }, [handleApiCall]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  return {
    slots,
    loading,
    error,
    fetchSlots,
    updateSlot,
    assignCompanyToSlot,
    unassignSlot,
  };
};

// Hook for bids data
export const useBids = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [activeBids, setActiveBids] = useState<Bid[]>([]);
  const { loading, error, handleApiCall } = useApi();

  const fetchBids = useCallback(async () => {
    const result = await handleApiCall(() => apiService.getBids());
    if (result) {
      setBids(result);
    }
  }, [handleApiCall]);

  const fetchActiveBids = useCallback(async () => {
    const result = await handleApiCall(() => apiService.getActiveBids());
    if (result) {
      setActiveBids(result);
    }
  }, [handleApiCall]);

  const createBid = useCallback(async (bid: Partial<Bid>) => {
    const result = await handleApiCall(() => apiService.createBid(bid));
    if (result) {
      setBids(prev => [...prev, result]);
      if (result.status === 'active') {
        setActiveBids(prev => [...prev, result]);
      }
    }
    return result;
  }, [handleApiCall]);

  useEffect(() => {
    fetchBids();
    fetchActiveBids();
  }, [fetchBids, fetchActiveBids]);

  return {
    bids,
    activeBids,
    loading,
    error,
    fetchBids,
    fetchActiveBids,
    createBid,
  };
};

// Hook for analytics data
export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const { loading, error, handleApiCall } = useApi();

  const fetchAnalytics = useCallback(async () => {
    const result = await handleApiCall(() => apiService.getAnalytics());
    if (result) {
      setAnalytics(result);
    }
  }, [handleApiCall]);

  const fetchSlotAnalytics = useCallback(async (slotId: string) => {
    const result = await handleApiCall(() => apiService.getSlotAnalytics(slotId));
    return result;
  }, [handleApiCall]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    fetchAnalytics,
    fetchSlotAnalytics,
  };
};

// Hook for system health
export const useSystemHealth = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const { loading, error, handleApiCall } = useApi();

  const checkHealth = useCallback(async () => {
    const result = await handleApiCall(() => apiService.healthCheck(), false);
    if (result) {
      setIsHealthy(true);
      setLastCheck(new Date());
    } else {
      setIsHealthy(false);
    }
    return result;
  }, [handleApiCall]);

  useEffect(() => {
    checkHealth();
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  return {
    isHealthy,
    lastCheck,
    loading,
    error,
    checkHealth,
  };
};
