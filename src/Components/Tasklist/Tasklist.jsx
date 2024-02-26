import { DeleteTodoData, editModestatus, editTaskStatus, fetchTodoData, gettaskDetails, taskShare, updateTaskOrder } from '../../Redux/Slice';
import { Collapse, Divider, Button, Modal, Input, List, Avatar } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../Redux/userSlice';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import './Tasklist.css';



function Tasklist({ priority, todo }) {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [shareTask, setShareTask] = useState(null);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(fetchTodoData());
        dispatch(fetchUserData());

    }, [dispatch]);

    const handleStatus = async (id, status) => {
        const newStatus = status === 'uncompleted' ? 'completed' : 'uncompleted';
        await dispatch(editTaskStatus({ id: id, status: newStatus }));
        dispatch(fetchTodoData());
    };

    const handleEdit = async (data) => {
        await dispatch(gettaskDetails(data));
        dispatch(editModestatus(true));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCheckboxClick = (event) => {
        event.stopPropagation();
    };

    const handleDeleteTask = async (id) => {
        setId(id);
        setOpen(true);
    };

    const handleOk = async () => {
        await dispatch(DeleteTodoData(id));
        setConfirmLoading(true);
        await dispatch(fetchTodoData());
        setOpen(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
        const items = Array.from(todo?.todo);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const orderData = items.map((task, index) => ({ id: task._id, order: index }));
        await dispatch(updateTaskOrder(orderData));
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

    const handleShareClick = (data) => {
        setShareTask(data)
        setShareModalVisible(true);
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        //  search logic
    };

    const handleUserSelect = (user) => {
        setSelectedUsers([...selectedUsers, user]);
    };

    const handleShareTask = async () => {
        await dispatch(taskShare({ shareTask, selectedUsers }))
        setShareModalVisible(false);
    }

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
                                                            <Button type="danger" onClick={() => handleDeleteTask(data._id)}>Delete</Button>
                                                            <button onClick={() => handleEdit(data)} style={{ borderRadius: "7px", alignItems: "center" }}><EditIcon style={{ fontSize: 17 }} />edit</button>
                                                            <Button onClick={() => handleShareClick(data)}>Share</Button>
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
            <Modal
                title="Share Task"
                visible={shareModalVisible}
                onCancel={() => setShareModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShareModalVisible(false)}>Cancel</Button>,
                    <Button key="share" type="primary" onClick={() => handleShareTask()}>Share</Button>
                ]}
            >
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={user.users}
                    renderItem={(user) => (
                        <List.Item onClick={() => handleUserSelect(user)}>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={user.name}
                                description={user.email}
                            />
                        </List.Item>
                    )}
                />
                <Divider />
                <p>Selected Users:</p>
                <List
                    itemLayout="horizontal"
                    dataSource={selectedUsers}
                    renderItem={(user) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={user.name}
                                description={user.email}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
            <Modal
                title="Confirm Delete"
                visible={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Do you want to delete this task?</p>
            </Modal>
        </>
    );
}

export default Tasklist;
