import { useState, useCallback } from 'react';

export type BottomTabKey =
  | 'home'
  | 'search'
  | 'favorites'
  | 'cart'
  | 'profile';

interface UseBottomTabsReturn {
  activeTab: BottomTabKey;
  setActiveTab: (tab: BottomTabKey) => void;
  isActive: (tab: BottomTabKey) => boolean;
}

export function useBottomTabs(
  initialTab: BottomTabKey = 'home'
): UseBottomTabsReturn {
  const [activeTab, setActiveTabState] = useState<BottomTabKey>(initialTab);

  const setActiveTab = useCallback((tab: BottomTabKey) => {
    setActiveTabState(tab);
  }, []);

  const isActive = useCallback(
    (tab: BottomTabKey) => activeTab === tab,
    [activeTab]
  );

  return {
    activeTab,
    setActiveTab,
    isActive,
  };
}