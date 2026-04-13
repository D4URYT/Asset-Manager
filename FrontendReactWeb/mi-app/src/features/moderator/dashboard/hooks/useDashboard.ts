"use client";

import { useState, useEffect } from 'react';
import { DashboardData } from '../types/dashboard.types';
import { dashboardMock } from '../data/dashboard.mock';

interface UseDashboardReturn {
  data: DashboardData;
  isLoading: boolean;
  periodo: '7d' | '30d' | '1y';
  setPeriodo: (p: '7d' | '30d' | '1y') => void;
  ahora: string;
}

export function useDashboard(): UseDashboardReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [periodo, setPeriodo] = useState<'7d' | '30d' | '1y'>('7d');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const ahora = new Date().toLocaleString('es-DO', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return { data: dashboardMock, isLoading, periodo, setPeriodo, ahora };
}