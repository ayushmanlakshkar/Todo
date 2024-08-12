import React, { useEffect, useState } from 'react';
import Task from '../components/Task';
import axios from 'axios';
import { TaskModel } from '../model/TaskModel';
import { toast } from 'react-toastify';
import { useTaskModal } from '../providers/TaskModalProvider';
import { useTaskCounter } from '../providers/TasksCounterProvider';

function Home() {
  const [todoTasks, setTodoTasks] = useState<TaskModel[]>([]);
  const [onProgressTasks, setOnProgressTasks] = useState<TaskModel[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskModel[]>([]);
  const {isModalOpen} = useTaskModal();
  const {refreshTaskCounts} = useTaskCounter();

  useEffect(() => {
    fetchTasks();
  }, [isModalOpen]);

 
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/tasks`);
      const tasks: TaskModel[] = response.data;
      setTodoTasks(tasks.filter(task => task.status === 'To Do').reverse());
      setOnProgressTasks(tasks.filter(task => task.status === 'In Progress').reverse());
      setDoneTasks(tasks.filter(task => task.status === 'Done').reverse());
      refreshTaskCounts();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks.');
    }
  };

  return (
    <div className='flex-1 flex gap-7 flex-wrap justify-between md:px-7 items-center py-3 md:overflow-y-auto'>
      {/* To Do */}
      <div className="md:h-full flex-1 min-w-72 md:min-w-80 bg-[#ECEDEE] h-[600px] rounded-2xl shadow-custom mx-auto p-4">
        <div className="w-full h-full flex mx-auto flex-col">
          <div className="flex items-center justify-center mb-4">
            <div className="flex gap-3 items-center">
              <div className="w-2 h-2 rounded-full bg-[#5030E5]"></div>
              <h2 className="text-lg font-semibold">To Do</h2>
              <span className="flex items-center justify-center w-6 h-6 bg-[#E0E0E0] text-[#625F6D] rounded-full text-sm">
                {todoTasks.length}
              </span>
            </div>
          </div>
          <div className="border-[2px] border-[#5030E5] mb-3 rounded-full"></div>
          <div className="flex flex-1 overflow-y-auto no-scrollbar">
            <div className="w-full h-96">
              {todoTasks.map((task) => (
                <Task key={task._id} task={task} refreshTasks={fetchTasks} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* On Progress */}
      <div className="md:h-full flex-1 min-w-72 md:min-w-80 bg-[#ECEDEE] h-[600px] rounded-2xl shadow-custom mx-auto p-4">
        <div className="w-full h-full flex mx-auto flex-col">
          <div className="flex items-center justify-center mb-4">
            <div className='flex gap-3 items-center'>
              <div className='w-2 h-2 rounded-full bg-[#FFA500]'></div>
              <h2 className="text-lg font-semibold">On Progress</h2>
              <span className="flex items-center justify-center w-6 h-6 bg-[#E0E0E0] text-[#625F6D] rounded-full text-sm">
                {onProgressTasks.length}
              </span>
            </div>
          </div>
          <div className="border-[2px] border-[#FFA500] mb-3 rounded-full"></div>
          <div className='flex flex-1 overflow-y-auto no-scrollbar'>
            <div className='w-full h-96'>
              {onProgressTasks.map((task) => (
                <Task key={task._id} task={task} refreshTasks={fetchTasks} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Done */}
      <div className="md:h-full flex-1 min-w-72 md:min-w-80 bg-[#ECEDEE] h-[600px] rounded-2xl shadow-custom mx-auto p-4">
        <div className="w-full h-full flex mx-auto flex-col">
          <div className="flex items-center justify-center mb-4">
            <div className='flex gap-3 items-center'>
              <div className='w-2 h-2 rounded-full bg-[#76A5EA]'></div>
              <h2 className="text-lg font-semibold">Done</h2>
              <span className="flex items-center justify-center w-6 h-6 bg-[#E0E0E0] text-[#625F6D] rounded-full text-sm">
                {doneTasks.length}
              </span>
            </div>
          </div>
          <div className="border-[2px] border-[#8BC48A] mb-3 rounded-full"></div>
          <div className='flex flex-1 overflow-y-auto no-scrollbar pb-5'>
            <div className='w-full h-96'>
              {doneTasks.map((task) => (
                <Task key={task._id} task={task} refreshTasks={fetchTasks} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
