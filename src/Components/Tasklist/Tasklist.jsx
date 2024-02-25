import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteTodoData, editModestatus, editTaskStatus, fetchTodoData, gettaskDetails, updateTaskOrder } from '../../Redux/Slice';
import './Tasklist.css'
import { Collapse, Divider } from 'antd';
import { Button, Modal } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dayjs from 'dayjs';
function Tasklist({ priority ,todo}) {
   
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = (id) => {
        setId(id)
        setOpen(true);
    };

    const handleOk = async () => {
        console.log(id);
        await dispatch(DeleteTodoData(id))
        await setConfirmLoading(true);
        await dispatch(fetchTodoData())
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };


    useEffect(() => {
        dispatch(fetchTodoData())
    }, [dispatch])


    const HandleStatus = async (id, status) => {
        if (status == "uncompleted") {
            await dispatch(editTaskStatus({ id: id, status: "completed" }))

        } else {
            await dispatch(editTaskStatus({ id: id, status: "uncompleted" }))

        }
        dispatch(fetchTodoData())
    }

    const HandleEdit = async (data) => {
        await dispatch(gettaskDetails(data))
        dispatch(editModestatus(true))
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(data);
    }

    const handleCheckboxClick = (event) => {
        event.stopPropagation();
    };

    
  const handleDragEnd = async (result) => {
    if (!result.destination) return; 
    const items = Array.from(todo?.todo);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const orderData = items.map((task, index) => ({ id: task._id, order: index }));
    await dispatch(updateTaskOrder(orderData))
   await dispatch(fetchTodoData())
  };

  const calculateRemainingTime = (dueDate,time) => {
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
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todo-list">
                    {(provided) => (
                        <div className='todo-list' ref={provided.innerRef} {...provided.droppableProps}>
                            <Divider orientation="left">Task Lists</Divider>
                            {todo?.todo?.map((data, index) => (
                                data.priority === priority || priority === "all" ?
                                    <Draggable key={data._id} draggableId={data._id} index={index}>
                                        {(provided) => (
                                            <div className="todo-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Collapse size="large">
                                                    <Collapse.Panel key="1" header={
                                                        <div className='head'>
                                                            {data.status === "completed" ? <del style={{ color: "grey" }}>{data.title}</del> : <span>{data.title}</span>}
                                                            <input type='checkbox' onChange={() => HandleStatus(data._id, data.status)} onClick={handleCheckboxClick} checked={data.status === 'completed'} />
                                                        </div>
                                                    }>
                                                        <div>
                                                            <p><strong>Discription</strong> : {data.description}</p>
                                                            <p><strong>DueDate</strong> :{data.dueDate}</p>
                                                            <p><strong>DueDate</strong> :{data.time}</p>
                                                            <p><strong>Priority</strong> : {data.priority}</p>
                                                            <p><strong>Status</strong> : {data.status}</p>
                                                            <h3>Task in: {calculateRemainingTime(`${data.dueDate} ${data.time}`)}</h3>
                                                            <Button type="danger" onClick={() => showModal(data._id)}>Delete</Button>
                                                            <Modal
                                                                title="Title"
                                                                open={open}
                                                                onOk={handleOk}
                                                                confirmLoading={confirmLoading}
                                                                onCancel={handleCancel}
                                                            >
                                                                <p>Do You Want To Delete This Task...?</p>
                                                            </Modal>
                                                            <button onClick={() => HandleEdit(data)} style={{ borderRadius: "7px", alignItems:"center" }}><EditIcon style={{ fontSize: 17 }}/>edit</button>
                                                        </div>
                                                    </Collapse.Panel>
                                                </Collapse>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Draggable>
                                    :
                                    null
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </>
    )
}

export default Tasklist
