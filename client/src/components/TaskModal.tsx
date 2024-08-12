import React, { useEffect, useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { useTaskModal } from '../providers/TaskModalProvider';
import { TaskModel } from '../model/TaskModel';
import { toast } from 'react-toastify'
import axios from 'axios';

interface TaskModalProps {
    mode: 'edit' | 'create';
    taskData?: TaskModel; // Optional, only required in edit mode
}

const TaskModal: React.FC<TaskModalProps> = () => {
    const [deadline, setDeadline] = useState<Dayjs | null>(dayjs());
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [formattedDeadline, setFormattedDeadline] = useState<Date | null>(null);
    const { isModalOpen, closeModal, taskData, modalMode } = useTaskModal();

    const setToEndOfDay = (date: Dayjs | null): Dayjs | null => {
        return date ? date.set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 0) : null;
    };
    const submitData = async () => {
        console.log('submitData');
        if (!title || !description || !priority) {
            toast.error('Please fill all fields');
            console.log('Toast error: Please fill all fields');
            return;
        }
        if (!formattedDeadline) {
            toast.error('Please select a deadline');
            return;
        }
        const data = {
            title,
            description,
            priority,
            deadline: formattedDeadline,
        };
        if (modalMode === 'edit' && taskData) {
            await axios.put(`${process.env.REACT_APP_SERVER}/api/tasks/${taskData._id}`, data).then((response) => {
                toast.success('Task updated successfully');
            }).catch((error) => {
                toast.error(error.message);
            })
        } else {
            await axios.post(`${process.env.REACT_APP_SERVER}/api/tasks`, data).then((response) => {
                toast.success('Task created successfully');
            }).catch((error) => {
                toast.error(error.message);
            })
        }
        setTitle('');
        setDescription('');
        setDeadline(dayjs());
        setPriority('');
        closeModal();
    }
    const getSelectClass = (): string => {
        switch (priority) {
            case 'High':
                return 'bg-[#D8727D] bg-opacity-[25%] text-[#D8727D]';
            case 'Low':
                return 'bg-[#DFA874] bg-opacity-[25%] text-[#D58D49]';
            case 'Medium':
                return 'bg-[#F9CF85] bg-opacity-[25%] text-[#F9A109]';
            default:
                return 'bg-gray-100 text-gray-500';
        }
    };

    useEffect(() => {
        const endOfDayDate = setToEndOfDay(deadline);
        if (endOfDayDate) {
            const formattedDate = endOfDayDate.format('YYYY-MM-DDTHH:mm:ss.SSS');
            setFormattedDeadline(new Date(formattedDate));
        }
    }, [deadline]);

    useEffect(() => {
        if (modalMode === 'edit' && taskData) {
            setTitle(taskData.title || '');
            setDescription(taskData.description || '');
            setDeadline(taskData.deadline ? dayjs(taskData.deadline) : dayjs());
            setPriority(taskData.priority || '');
        }
    }, [isModalOpen]);

    if (!isModalOpen) return null

    return (
        <div className='z-10 flex justify-center items-center absolute top-0 left-0 w-screen h-screen bg-gray-400 shadow-custom bg-opacity-50'>
            <div className='w-11/12 md:w-7/12 h-5/6 md:h-4/5 bg-white rounded-xl shadow-2xl flex flex-col overflow-y-auto pb-7'>
                <div className='m-2 mx-4 py-2 md:px-5 md:py-6 border-b-[2px] h-fit flex items-center justify-between text-lg md:text-3xl font-semibold gap-3'>
                    <div className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-[#20E7F4] rounded-full'></div>
                        <div>{modalMode === 'edit' ? 'Edit Task' : 'Add Task'}</div>
                    </div>
                    <div className={`text-lg font-Medium px-4 border-[1px] rounded-xl py-1 md:py-2 ${getSelectClass()}`}>
                        <select
                            className='px-3 bg-transparent focus:outline-none'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="" disabled>Select priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col mx-4 px-2 md:pt-5 md:px-9 gap-7'>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        className='flex text-lg md:text-xl font-Medium focus:outline-none border-b-[1px] border-black focus:border-b-[2px]'
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        className='flex text-lg md:text-xl font-Medium focus:outline-none border-b-[1px] border-black focus:border-b-[2px]'
                    />
                    <div className='text-[#5A5A5A] font-semibold flex flex-col md:flex-row md:-mt-2 w-full'>
                        <div className='-mb-3 w-fit'>
                            Deadline :
                        </div>
                        <div className='flex-1'>
                            <DateCalendar
                                value={deadline}
                                onChange={(newValue) => setDeadline(newValue)}
                                disablePast
                            />
                        </div>
                    </div>
                </div>
                <div className='mx-auto flex gap-5'>
                    <button onClick={submitData} className='bg-[#4B00F7] py-2 px-8 w-fit mx-auto rounded-2xl text-white'>
                        {modalMode === 'edit' ? 'Update Task' : 'Assign Task'}
                    </button>
                    <button onClick={() => {
                        closeModal();
                        setTitle('');
                        setDescription('');
                        setDeadline(dayjs());
                        setPriority('');
                    }
                    } className='bg-red-600 py-2 px-8 w-fit mx-auto rounded-xl text-white'>
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TaskModal;
