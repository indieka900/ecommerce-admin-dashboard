import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';
import toast from 'react-hot-toast';

export const useComprehensiveDashboard = (period = 30) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(API_ENDPOINTS.DASHBOARD, {
                params: { period }
            });

            setData(response.data);
        } catch (err) {
            setError(err.message);
            toast.error('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    }, [period]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const refetch = () => {
        fetchDashboardData();
    };

    return { data, loading, error, refetch };
};

// Hook for real-time updates
export const useRealtimeUpdates = (intervalMs = 60000) => {
    const [realtimeData, setRealtimeData] = useState(null);
    const [loading] = useState(false);

    const fetchRealtimeData = useCallback(async () => {
        try {
            const response = await api.get(API_ENDPOINTS.DASHBOARD, {
                params: { period: 1 } // Just today's data
            });

            setRealtimeData(response.data.realtime);
        } catch (error) {
            console.error('Failed to fetch realtime data:', error);
        }
    }, []);

    useEffect(() => {
        fetchRealtimeData();

        const interval = setInterval(fetchRealtimeData, intervalMs);

        return () => clearInterval(interval);
    }, [fetchRealtimeData, intervalMs]);

    return { realtimeData, loading };
};

// Hook for dashboard filters
export const useDashboardPeriod = () => {
    const [period, setPeriod] = useState(30);
    const [customRange, setCustomRange] = useState({
        startDate: null,
        endDate: null
    });

    const updatePeriod = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const setDateRange = (startDate, endDate) => {
        setCustomRange({ startDate, endDate });
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        setPeriod(days);
    };

    return { period, customRange, updatePeriod, setDateRange };
};