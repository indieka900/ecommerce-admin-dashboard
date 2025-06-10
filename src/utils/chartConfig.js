import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,   // For x-axis labels
    LinearScale,     // For y-axis numbers
    PointElement,    // For points on line charts
    LineElement,     // For line charts
    BarElement,      // For bar charts
    Title,           // For chart titles
    Tooltip,         // For hover tooltips
    Legend,          // For chart legends
    ArcElement,      // For pie/doughnut charts
    Filler           // For filled area charts
);

// Export default Chart configuration
export const defaultChartColors = [
    '#6366f1', // Indigo
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#06b6d4', // Cyan
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#84cc16', // Lime
    '#f97316', // Orange
    '#64748b'  // Slate
];

export const chartTheme = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textColor: '#64748b',
    gridColor: 'rgba(148, 163, 184, 0.1)',
    tooltipBg: 'rgba(15, 23, 42, 0.9)',
    tooltipBorder: '#334155'
};