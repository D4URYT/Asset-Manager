import { useState, useCallback } from 'react';

export type TabName = 'home' | 'products' | 'cart' | 'orders';

export function useNavDrawer() {
  const [leftOpen, setLeftOpen]   = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const openLeft  = useCallback(() => { setLeftOpen(true);  setRightOpen(false); }, []);
  const openRight = useCallback(() => { setRightOpen(true); setLeftOpen(false);  }, []);
  const closeAll  = useCallback(() => { setLeftOpen(false); setRightOpen(false); }, []);

  return { leftOpen, rightOpen, openLeft, openRight, closeAll };
}

export function useBottomTabs(initial: TabName = 'home') {
  const [activeTab, setActiveTab] = useState<TabName>(initial);
  return { activeTab, setActiveTab };
}