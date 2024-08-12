import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file
import { TaskCounterProvider } from './providers/TasksCounterProvider';


import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TaskCounterProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
      <ToastContainer/>
    </LocalizationProvider>
    </TaskCounterProvider>
  </React.StrictMode>
);

