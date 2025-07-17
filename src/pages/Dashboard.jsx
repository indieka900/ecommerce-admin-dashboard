import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Skeleton,
  useTheme,
  Button
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { formatters } from '../utils/formatters';
import RevenueOrdersCharts from '../components/dashboard/RevenueOrdersCharts';
import { useComprehensiveDashboard, useRealtimeUpdates, useDashboardPeriod } from '../hooks/useDashboard';
import KeyMetrics from '../components/dashboard/KeyMetrics';
import RealTimeMetrics from '../components/dashboard/RealTimeMetrics';
import Header from '../components/dashboard/Header';
import ProductPerformance from '../components/dashboard/ProductPerformance';
import CustomerAnalytics from '../components/dashboard/CustomerAnalytics';
import AdditionalAnalytics from '../components/dashboard/AdditionalAnalytics';
import GeographicBrandCharts from '../components/dashboard/GeographicBrandCharts';
import StockWeeklyCharts from '../components/dashboard/StockWeeklyCharts';
import SummaryCards from '../components/dashboard/SummaryCards';


const Dashboard = () => {
  const theme = useTheme();
  const { period, updatePeriod } = useDashboardPeriod();
  const { data, loading, error, refetch } = useComprehensiveDashboard(period);
  const { realtimeData } = useRealtimeUpdates(30000);

  const [selectedPeriod, setSelectedPeriod] = useState(30);

  const handlePeriodChange = (days) => {
    setSelectedPeriod(days);
    updatePeriod(days);
  };

  if (loading && !data) {
    return (
      <Box p={3}>
        <Grid container spacing={3}>
          {[...Array(12)].map((_, i) => (
            <Grid
              key={i}
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}>
              <Skeleton variant="rectangular" height={140} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} textAlign="center">
        <Typography color="error">Failed to load dashboard data</Typography>
        <Button onClick={refetch} startIcon={<Refresh />} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  const dashboardData = data || {};
  const revenue = dashboardData.revenue || {};
  const orders = dashboardData.orders || {};
  const customers = dashboardData.customers || {};
  const products = dashboardData.products || {};
  const realtime = realtimeData || dashboardData.realtime || {};
  const charts = dashboardData.charts || {};
  const payments = dashboardData.payments || {};

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Header
        selectedPeriod={selectedPeriod}
        handlePeriodChange={handlePeriodChange}
        refetch={refetch}
      />

      {/* Real-time Metrics */}
      <RealTimeMetrics
        realtime={realtime}
        theme={theme}
        loading={loading}
        formatCurrency={formatters.currency}
      />

      {/* Key Metrics */}
      <KeyMetrics
        revenue={revenue}
        orders={orders}
        customers={customers}
        loading={loading}
        theme={theme}
        formatCurrency={formatters.currency}
      />

      {/* Revenue & Orders Charts */}
      <RevenueOrdersCharts
        loading={loading}
        theme={theme}
        charts={charts}
        orders={orders}
        formatCurrency={formatters.currency}
      />

      {/* Product Performance */}
      <ProductPerformance
        products={products}
        theme={theme}
        formatCurrency={formatters.currency}
        loading={loading}
      />

      {/* Customer Analytics */}
      <CustomerAnalytics 
        loading={loading} 
        customers={customers} 
        theme={theme} 
        formatCurrency={formatters.currency} 
      />

      {/* Additional Analytics */}
      <AdditionalAnalytics 
        theme={theme} 
        orders={orders} 
        payments={payments} 
        loading={loading} 
        formatCurrency={formatters.currency} 
        charts={charts} 
      />

      {/* Geographic & Revenue by Brand */}
      <GeographicBrandCharts 
        loading={loading}
        dashboardData={dashboardData}
        revenue={revenue}
        theme={theme}
        formatCurrency={formatters.currency}
        formatNumber={formatters.number}
      />

      {/* Low Stock Alert & Weekly Comparison */}
      <StockWeeklyCharts 
        loading={loading}
        products={products}
        charts={charts}
        formatCurrency={formatters.currency}
        theme={theme}
      />

      {/* Summary Cards */}
      <SummaryCards 
        orders={orders}
        realtime={realtime}
      />
    </Box>
  );
};

export default Dashboard;