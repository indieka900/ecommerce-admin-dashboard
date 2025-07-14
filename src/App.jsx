import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeProvider';
import router from './routes';
import './utils/chartConfig';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <LoadingProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#4caf50',
                  },
                },
                error: {
                  style: {
                    background: '#f44336',
                  },
                },
              }}
            />
          </LoadingProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;