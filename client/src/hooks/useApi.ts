import { useState, useCallback } from 'react';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface ApiOptions {
  headers?: Record<string, string>;
  body?: any;
}

export const useApi = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = useCallback(async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    options?: ApiOptions
  ): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          ...options?.headers,
        },
      };

      if (options?.body && method !== 'GET') {
        config.body = JSON.stringify(options.body);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url: string, options?: ApiOptions) => {
    return makeRequest(url, 'GET', options);
  }, [makeRequest]);

  const post = useCallback((url: string, options?: ApiOptions) => {
    return makeRequest(url, 'POST', options);
  }, [makeRequest]);

  const put = useCallback((url: string, options?: ApiOptions) => {
    return makeRequest(url, 'PUT', options);
  }, [makeRequest]);

  const del = useCallback((url: string, options?: ApiOptions) => {
    return makeRequest(url, 'DELETE', options);
  }, [makeRequest]);

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    delete: del,
  };
};