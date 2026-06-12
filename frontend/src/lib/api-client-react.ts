import { useMutation, useQuery } from '@tanstack/react-query';

export interface RiskResult {
  decision: "ALLOW" | "MFA_REQUIRED" | "BLOCK";
  score: number;
  riskLevel: string;
  reasons: string[];
  whyDecision: string;
  contributions: Array<{
    factor: string;
    description: string;
    points: number;
  }>;
}

export interface FeatureImportanceData {
  features: Array<{
    feature: string;
    label: string;
    importance: number;
  }>;
  modelInfo: string;
  trainedOn: string;
}

export function usePredictRisk(options: any) {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  return useMutation({
    mutationFn: async (vars: any) => {
      const response = await fetch(`${baseUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vars)
      });
      if (!response.ok) {
        throw new Error('Prediction API failed');
      }
      return await response.json() as RiskResult;
    },
    ...options?.mutation,
  });
}

export function useGetFeatureImportance() {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  return useQuery({
    queryKey: ['featureImportance'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/feature-importance`);
      if (!response.ok) {
        throw new Error('Feature importance API failed');
      }
      return await response.json() as FeatureImportanceData;
    }
  });
}
