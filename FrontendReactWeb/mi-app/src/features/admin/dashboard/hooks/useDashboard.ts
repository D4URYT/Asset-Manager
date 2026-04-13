'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DashboardData, Period } from '../types/dashboard.types';
import { mockDashboardData } from '../data/dashboardData';

interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
}

export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setIsRefreshing(true) : setIsLoading(true);
      setError(null);
      // Replace with: const res = await fetch(`/api/dashboard?period=${selectedPeriod}`);
      await new Promise((r) => setTimeout(r, 700));
      setData(mockDashboardData);
    } catch {
      setError('No se pudo cargar la información del dashboard.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedPeriod]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const refresh = useCallback(() => fetchData(true), [fetchData]);

  return { data, isLoading, isRefreshing, error, refresh, selectedPeriod, setSelectedPeriod };
}
