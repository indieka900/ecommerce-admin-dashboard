/* eslint-disable no-unused-vars */
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';

const LineChart = ({
    data,
    title,
    height = 300,
    showGrid = true,
    tension = 0.4,
    colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']
}) => {
    // Default options for consistent styling
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    color: '#64748b',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f1f5f9',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                padding: 12
            }
        },
        scales: {
            x: {
                grid: {
                    display: showGrid,
                    color: 'rgba(148, 163, 184, 0.1)'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    display: showGrid,
                    color: 'rgba(148, 163, 184, 0.1)'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            }
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 6,
                borderWidth: 2
            },
            line: {
                tension: tension,
                borderWidth: 3
            }
        }
    };

    // Auto-assign colors to datasets
    const processedData = {
        ...data,
        datasets: data.datasets.map((dataset, index) => ({
            ...dataset,
            borderColor: dataset.borderColor || colors[index % colors.length],
            backgroundColor: dataset.backgroundColor || `${colors[index % colors.length]}20`,
            pointBorderColor: dataset.pointBorderColor || colors[index % colors.length],
            pointBackgroundColor: dataset.pointBackgroundColor || '#ffffff',
            fill: dataset.fill !== undefined ? dataset.fill : false
        }))
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2
            }}
        >
            {title && (
                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
            <Box sx={{ height: height }}>
                <Line data={processedData} options={defaultOptions} />
            </Box>
        </Paper>
    );
};

// src/components/charts/BarChart.js
const BarChart = ({
    data,
    title,
    height = 300,
    horizontal = false,
    showGrid = true,
    colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']
}) => {
    // Bar is now imported at the top

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: horizontal ? 'y' : 'x',
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    color: '#64748b',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f1f5f9',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                padding: 12
            }
        },
        scales: {
            x: {
                grid: {
                    display: showGrid,
                    color: 'rgba(148, 163, 184, 0.1)'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    display: showGrid,
                    color: 'rgba(148, 163, 184, 0.1)'
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    const processedData = {
        ...data,
        datasets: data.datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor || `${colors[index % colors.length]}80`,
            borderColor: dataset.borderColor || colors[index % colors.length],
            borderWidth: dataset.borderWidth || 2,
            borderRadius: dataset.borderRadius || 4,
            borderSkipped: false
        }))
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2
            }}
        >
            {title && (
                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
            <Box sx={{ height: height }}>
                <Bar data={processedData} options={defaultOptions} />
            </Box>
        </Paper>
    );
};

// src/components/charts/DoughnutChart.js
const DoughnutChart = ({
    data,
    title,
    height = 300,
    showLegend = true,
    cutout = '60%',
    colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899']
}) => {
    // Doughnut is now imported at the top

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: showLegend,
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    color: '#64748b',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f1f5f9',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                padding: 12,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: cutout
    };

    const processedData = {
        ...data,
        datasets: data.datasets.map((dataset, _index) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor || colors.slice(0, data.labels.length),
            borderColor: dataset.borderColor || '#1e293b',
            borderWidth: dataset.borderWidth || 2,
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
        }))
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2
            }}
        >
            {title && (
                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
            <Box sx={{ height: height }}>
                <Doughnut data={processedData} options={defaultOptions} />
            </Box>
        </Paper>
    );
};

// src/components/charts/PieChart.js
const PieChart = ({
    data,
    title,
    height = 300,
    showLegend = true,
    colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899']
}) => {
    // Pie is now imported at the top

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: showLegend,
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    color: '#64748b',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f1f5f9',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                padding: 12,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    const processedData = {
        ...data,
        datasets: data.datasets.map((dataset, _index) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor || colors.slice(0, data.labels.length),
            borderColor: dataset.borderColor || '#1e293b',
            borderWidth: dataset.borderWidth || 2,
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
        }))
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2
            }}
        >
            {title && (
                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                    {title}
                </Typography>
            )}
            <Box sx={{ height: height }}>
                <Pie data={processedData} options={defaultOptions} />
            </Box>
        </Paper>
    );
};

export { LineChart, BarChart, DoughnutChart, PieChart };