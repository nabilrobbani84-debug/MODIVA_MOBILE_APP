// ========================================
// src/hooks/useApi.js
// ========================================
/**
 * useApi Hook
 * Custom hook untuk API calls dengan loading dan error handling
 */
import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiFunction(...params);
        
        if (result.success) {
          setData(result.data);
          return { success: true, data: result.data };
        } else {
          setError(result.message);
          return { success: false, error: result.message };
        }
      } catch (err) {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
};

export default useApi;