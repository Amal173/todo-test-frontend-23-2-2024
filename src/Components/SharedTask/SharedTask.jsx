import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { editTaskStatus, fetchSharedData, fetchTodoData } from '../../Redux/Slice'
import { Collapse } from 'antd';
import Header from '../Header/Header'
import './SharedTask.css'

function SharedTask() {

    const dispatch = useDispatch()
    const { sharedData } = useSelector((state) => state.todo)
        
        useEffect(() => {
            dispatch(fetchSharedData())
        }, [dispatch])

    const handleCheckboxClick = (event) => {
        event.stopPropagation();
    };

    const handleStatus = async (id, status) => {
        const newStatus = status === 'uncompleted' ? 'completed' : 'uncompleted';
        await dispatch(editTaskStatus({ id: id, status: newStatus }));
        dispatch(fetchTodoData());
    };

    const calculateRemainingTime = (dueDate, time) => {
        const DueDate = new Date(dueDate);
        const currentDate = new Date();
        const remainingTime = DueDate.getTime(time) - currentDate.getTime();
        if (remainingTime <= 0) {
            return 'Task expired';
        } else {
            const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            return `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes`;
        }
    };

    return (
        <>
            <Header />
            <div>
                <h2>Shared Task</h2>
                {sharedData?.todo?.map((data, index) => (
                    <div className="shared-item" >
                        <Collapse size="large">
                            <Collapse.Panel key="1" header={
                                <div className='head'>
                                    {data.status === "completed" ? <del style={{ color: "grey" }}>{data.title}</del> : <span>{data.title}</span>}
                                    <input type='checkbox' onChange={() => handleStatus(data._id, data.status)} onClick={handleCheckboxClick} checked={data.status === 'completed'} />
                                </div>
                            }>
                                <div>
                                    <p><strong>Discription</strong> : {data.description}</p>
                                    <p><strong>DueDate</strong> :{data.dueDate}</p>
                                    <p><strong>DueDate</strong> :{data.time}</p>
                                    <p><strong>Priority</strong> : {data.priority}</p>
                                    <p><strong>Status</strong> : {data.status}</p>
                                    <h3>Task in: {calculateRemainingTime(`${data.dueDate} ${data.time}`)}</h3>
                                </div>
                            </Collapse.Panel>
                        </Collapse>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SharedTask