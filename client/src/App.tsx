import React from 'react';
import './App.css';
import Sidebar from './utils/Sidebar';
import Navbar from './utils/Navbar';
import Home from './pages/Home';
import TaskModal from './components/TaskModal';
import { TaskModalProvider } from './providers/TaskModalProvider';

function App() {
  return (
    <TaskModalProvider>
      <div className='p-6 flex flex-col gap-6 h-screen w-screen max-w-[100vw] max-h-[100vh] overflow-y-hidden overflow-x-hidden'>
        <Navbar />
        <div className='flex mx-4 my-3 md:flex-row flex-col flex-1 gap-6 overflow-y-auto overflow-x-hidden md:overflow-y-hidden'>
          <Sidebar />
          <Home />
        </div>
        <TaskModal mode='create' />
      </div>
    </TaskModalProvider>
  );
}

export default App;
