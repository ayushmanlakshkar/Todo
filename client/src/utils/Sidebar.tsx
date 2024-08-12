import React from 'react'
import Active from '../assets/icons/Active.svg'
import Completed from '../assets/icons/Completed.svg'
import Expired from '../assets/icons/Expired.svg'
import { useTaskModal } from '../providers/TaskModalProvider'
import { useTaskCounter } from '../providers/TasksCounterProvider'
function Sidebar() {
    const {openModal}=useTaskModal();
    const { expiredCount, todoCount, doneCount,totalTodoCount } = useTaskCounter();

    return (
        <div className='w-full md:w-64  md:h-full flex flex-col justify-center items-center'>
            <div className='flex flex-row md:flex-col h-full w-full gap-6 mb-6 flex-wrap items-center justify-center'>
                <div className='flex md:flex-1 h-52 min-w-64 bg-[#ECEDEE] rounded-xl shadow-custom  items-center'>
                    <div className=' mx-6 flex flex-col gap-2'>
                        <div className='h-12 w-12 bg-[#F42D20] rounded-full flex justify-center items-center '>
                            <img src={Expired} alt='Active' className='font-bold' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-gray-500 font-bold'>
                                Expired Tasks
                            </div>
                            <div className=' text-3xl font-bold'>
                                {expiredCount}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex md:flex-1 h-52 min-w-64 bg-[#ECEDEE] rounded-xl shadow-custom  items-center'>
                    <div className=' mx-6 flex flex-col gap-2'>
                        <div className='h-12 w-12 bg-[#E89271] rounded-full flex justify-center items-center '>
                            <img src={Active} alt='Active' className='font-bold' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-gray-500 font-bold'>
All Active Tasks                            </div>
                            <div className=' text-3xl font-bold'>
                                {totalTodoCount}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex md:flex-1 h-52 min-w-64 bg-[#ECEDEE] rounded-xl shadow-custom  items-center'>
                    <div className=' mx-6 flex flex-col gap-2'>
                        <div className='h-12 w-12 bg-[#70A1E5] rounded-full flex justify-center items-center '>
                            <img src={Completed} alt='Active' className='font-bold' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='text-gray-500 font-bold'>
Completed Tasks                            </div>
                            <div className=' text-3xl font-bold'>
                                {doneCount}/{totalTodoCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={()=>openModal('create')} className='flex w-64 hover:bg-[#0D062D] bg-[#4B00F7] text-white rounded-2xl justify-center py-3'>
                    <div className='flex gap-2'>
                        <svg className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
                        <div>
                            Add Task
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Sidebar
