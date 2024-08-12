import React, { useState, useMemo } from 'react';
import { TaskModel } from '../model/TaskModel';
import { useTaskModal } from '../providers/TaskModalProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

interface TaskProps {
  task: TaskModel;
  refreshTasks: () => void;
}

const Task: React.FC<TaskProps> = ({ task, refreshTasks  }) => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const {openModal}=useTaskModal()

  const isExpired = useMemo(() => {
    const deadlineDate = new Date(task.deadline);
    const now = new Date();
    return deadlineDate < now;
  }, [task.deadline]);

  const getStatus = useMemo(() => {
    if (isExpired) return 'Expired';
    return task.status;
  }, [isExpired, task.status]);

  const getPriorityColor = (priority: string): string => {
    
    switch (priority) {
      case "High":
        return "bg-[#D8727D] bg-opacity-[25%] text-[#D8727D]";
      case "Low":
        return "bg-[#DFA874] bg-opacity-[25%] text-[#D58D49]";
      case "Medium":
        return "bg-[#F9CF85] bg-opacity-[25%] text-[#F9A109]";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };


  const handleDotClick = (): void => {
    setPopupVisible(!popupVisible);
  };

  const closePopup = (): void => {
    setPopupVisible(false);
  };

  const handleEdit = () => {
    openModal('edit', task);
  };

  const handleChangeStatus = async (newStatus:string) => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER}/api/tasks/${task._id}`, {...task ,status:newStatus});
      refreshTasks();  
      toast.success('Task updated successfully.');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task.');
    }  };


  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/api/tasks/${task._id}`);
      refreshTasks(); 
      toast.success('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task.');
    }
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow flex flex-col relative">
      <div className="flex items-center justify-between mb-2">
        {(() => {
          switch (getStatus) {
            case 'Expired':
              return <div className="text-[#797979] border-[1px] border-gray-200 bg-[#ECEDEE] bg-opacity-[25%] rounded px-2 py-1 text-xs font-semibold">
                Expired
              </div>;
            case 'Done':
              return <div className="text-[#68B266] bg-[#83C29D] bg-opacity-[25%] rounded px-2 py-1 text-xs font-semibold">
                Completed
              </div>;
            default:
              return <div className={`${getPriorityColor(task.priority)} rounded px-2 py-1 text-xs font-semibold`}>
                {task.priority}
              </div>;
          }
        })()}

        <div
          className="text-gray-400 hover:text-gray-600 cursor-pointer select-none"
          onClick={handleDotClick}
        >
          &#x2026;
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>
      <div className="text-sm text-gray-500">
        <span className="font-semibold">Deadline: </span>
        {new Date(task.deadline).toLocaleDateString()}
      </div>

      {popupVisible && (
        <div
          className="absolute right-0 top-10 bg-white shadow-lg rounded p-3 border-[1px] border-[#E0E0E0] z-10"
          onClick={closePopup}
        >
          <ul>
            
            {getStatus === "Expired" ? null : (
              <>
              {getStatus === "Done" ? null : 
              <li onClick={handleEdit} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">Edit</li>}
                {getStatus === "In Progress" && (
                  <li onClick={()=>handleChangeStatus("Done")} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">Mark as Done</li>
                )}
                {getStatus === "To Do" && (
                  <li onClick={()=>handleChangeStatus("In Progress")} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">Mark as On Progress</li>
                )}
              </>
            )}
            <li onClick={handleDelete} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Task;
