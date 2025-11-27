// ========================================
// src/hooks/useAuth.js
// ========================================
/**
 * useAuth Hook
 * Custom hook untuk authentication (re-export dari AuthContext)
 */
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;