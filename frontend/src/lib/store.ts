import { create } from 'zustand';
import type { RiskResult } from '@workspace/api-client-react';

interface RiskStore {
  latestResult: RiskResult | null;
  setLatestResult: (result: RiskResult) => void;
  clearResult: () => void;
}

export const useRiskStore = create<RiskStore>((set) => ({
  latestResult: null,
  setLatestResult: (result) => set({ latestResult: result }),
  clearResult: () => set({ latestResult: null }),
}));
