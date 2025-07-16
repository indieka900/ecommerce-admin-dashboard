import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Paper, Typography, Box, Skeleton } from '@mui/material';

const LineChart = ({
    data,
    title,
    height = 300,
    showGrid = true,
    tension = 0.4,
    colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'],
    loading = false
}) => {
    // Handle loading state
    if (loading) {
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
                <Skeleton variant="rectangular" height={height} />
            </Paper>
        );
    }

    // Handle null or missing data
    if (!data || !data.datasets || !data.labels) {
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
                <Box
                    sx={{
                        height: height,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.secondary'
                    }}
                >
                    <Typography variant="body2">No data available</Typography>
                </Box>
            </Paper>
        );
    }

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
                    },
                    callback: function (value) {
                        // Format large numbers
                        if (value >= 1000) {
                            return '$' + (value / 1000).toFixed(0) + 'k';
                        }
                        return '$' + value;
                    }
                }
            },
            y1: {
                type: 'linear',
                display: false,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
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

const BarChart = ({
    data,
    title,
    height = 300,
    showGrid = true,
    colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'],
    loading = false,
    horizontal = false
}) => {
    // Handle loading state
    if (loading) {
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
                <Skeleton variant="rectangular" height={height} />
            </Paper>
        );
    }

    // Handle null or missing data
    if (!data || !data.datasets || !data.labels) {
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
                <Box
                    sx={{
                        height: height,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.secondary'
                    }}
                >
                    <Typography variant="body2">No data available</Typography>
                </Box>
            </Paper>
        );
    }

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
        },
        elements: {
            bar: {
                borderWidth: 0,
                borderRadius: 4
            }
        }
    };

    // Auto-assign colors to datasets
    const processedData = {
        ...data,
        datasets: data.datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor || colors[index % colors.length],
            borderColor: dataset.borderColor || colors[index % colors.length],
            borderWidth: dataset.borderWidth || 0
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

const PieChart = ({
    data,
    title,
    height = 300,
    colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'],
    loading = false,
    showLegend = true
}) => {
    // Handle loading state
    if (loading) {
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
                <Skeleton variant="circular" width={height * 0.8} height={height * 0.8} />
            </Paper>
        );
    }

    // Handle null or missing data
    if (!data || !data.datasets || !data.labels) {
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
                <Box
                    sx={{
                        height: height,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.secondary'
                    }}
                >
                    <Typography variant="body2">No data available</Typography>
                </Box>
            </Paper>
        );
    }

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                display: showLegend,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    color: '#64748b',
                    font: {
                        size: 12,
                        weight: '500'
                    },
                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const dataset = data.datasets[0];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            return data.labels.map((label, i) => {
                                const value = dataset.data[i];
                                const percentage = ((value / total) * 100).toFixed(1);
                                return {
                                    text: `${label} (${percentage}%)`,
                                    fillStyle: dataset.backgroundColor[i],
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                        return [];
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
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    // Auto-assign colors to datasets
    const processedData = {
        ...data,
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor || colors,
            borderColor: dataset.borderColor || '#ffffff',
            borderWidth: dataset.borderWidth || 2
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

const DoughnutChart = ({ ...props }) => {
    // Doughnut is just a Pie with cutout
    return <PieChart {...props} />;
};

export { LineChart, BarChart, PieChart, DoughnutChart };