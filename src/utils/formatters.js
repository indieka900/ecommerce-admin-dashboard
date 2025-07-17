import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatters = {
    // Currency formatting
    currency: (amount, currency = 'KSH') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
        }).format(amount);
    },

    // Number formatting
    number: (value, decimals = 0) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value);
    },

    // Percentage formatting
    percentage: (value, decimals = 1) => {
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value / 100);
    },

    // Date formatting
    date: (date, format = 'MMM DD, YYYY') => {
        return dayjs(date).format(format);
    },

    // Date and time formatting
    datetime: (date, format = 'MMM DD, YYYY HH:mm') => {
        return dayjs(date).format(format);
    },

    // Relative time formatting
    relativeTime: (date) => {
        return dayjs(date).fromNow();
    },

    // Text truncation
    truncate: (text, length = 50) => {
        if (!text) return '';
        return text.length > length ? `${text.substring(0, length)}...` : text;
    },

    // File size formatting
    fileSize: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Phone number formatting
    phone: (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    },

    // Status badge formatting
    statusBadge: (status) => {
        const statusMap = {
            active: { color: 'success', label: 'Active' },
            inactive: { color: 'error', label: 'Inactive' },
            pending: { color: 'warning', label: 'Pending' },
            completed: { color: 'success', label: 'Completed' },
            cancelled: { color: 'error', label: 'Cancelled' },
            processing: { color: 'info', label: 'Processing' },
            shipped: { color: 'primary', label: 'Shipped' },
            delivered: { color: 'success', label: 'Delivered' },
        };
        return statusMap[status] || { color: 'default', label: status };
    },

    // average products per category
    avgProductsPerCategory: (categories, decimals = 2) => {
        if (!Array.isArray(categories) || categories.length === 0) return 0;
        const totalProducts = categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0);
        const avg = totalProducts / categories.length;
        return parseFloat(avg.toFixed(decimals));
    },

    // Total products count from product_count fields
    productCountTotal: (categories) => {
        if (!Array.isArray(categories)) return 0;
        return categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0);
    },

}