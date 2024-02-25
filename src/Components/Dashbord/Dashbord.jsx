import React, { useEffect, useState } from 'react'
import './Dashbord.css'
import Tasklist from '../Tasklist/Tasklist'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTodoData, UpdateTodoData, editModestatus, fetchTodoData } from '../../Redux/Slice';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header/Header';

function Dashbord() {
    const [priority, setPriority] = useState("all")
    const navigate = useNavigate()
    const { todo, tastDetails, editMode } = useSelector((state) => state.todo)
    const { userData } = useSelector((state) => state.user)
    console.log(userData);
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();
    if (editMode) {
        setValue("title", tastDetails.title)
        setValue("priority", tastDetails.priority)
        setValue("dueDate", tastDetails.dueDate)
        setValue("description", tastDetails.description)
        setValue("time", tastDetails.time)

    }
    const onSubmit = async (data) => {

        if (editMode) {
            await dispatch(UpdateTodoData({ id: tastDetails._id, data: data }))
            await dispatch(fetchTodoData())
            dispatch(editModestatus(false))
        } else {
            await dispatch(CreateTodoData(data))
            dispatch(fetchTodoData())
        }
        reset()
    };

    const totalTask = todo?.todo?.length
    useEffect(() => {
        dispatch(fetchTodoData())
        if (!Cookies.get("token")) {
            navigate('/')
        }
    }, [dispatch])

    const handleCancel = () => {
        reset()
        dispatch(editModestatus(false))
    }

    const completedCount = todo?.todo?.filter(data => data?.status === "completed").length;

    const onChangeTime = (time, timeString) => {
        setValue("time", timeString)
        setValue("userId", localStorage.getItem('userId'))
        console.log(timeString);
    };

    return (
        <>
            <Header />
           <div className='container'>
           <div class="to-do-list">
                <h1>To-Do List</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="add-task-container">
                        <input type="text" placeholder="Add new task..." id="new-task" name='title'  {...register("title")} />
                        <select id="task-filter" name='priority'   {...register("priority")} onChange={(e) => setPriority(e.target.value)}>
                            <option value="all">All</option>
                            <option value="urgent">Urgent</option>
                            <option value="important">Important</option>
                            <option value="optional">Optional</option>
                        </select>
                        {editMode ?
                            <>
                                <button type='submit' id="add-task-button" style={{ marginRight: "10px" }}>update</button>
                                <button type='button' id="add-task-button" onClick={() => handleCancel()}>cancel</button>
                            </>

                            :
                            <button type='submit' id="add-task-button"> + </button>
                        }
                    </div>
                    <div className='date-time'>
                        <input type="date" className='date-picker' name='dueDate'   {...register("dueDate")} />
                        {editMode ?
                            <>
                                <TimePicker
                                    onChange={onChangeTime}
                                    defaultValue={dayjs(tastDetails.time, 'HH:mm:ss')}
                                    format={'HH:mm:ss'}
                                    style={{ width: 200, height: 40 }}
                                />                        </>

                            :
                            <TimePicker onChange={onChangeTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} style={{ width: 200, height: 40 }} />
                        }
                    </div>
                    <textarea className='text-area' placeholder="Enter Descripion here" name='description'   {...register("description")}></textarea>
                </form>
                <div className="task-list" ></div>
                <Tasklist priority={priority} todo={todo} />
                <footer>
                    Total tasks: <span id="total-tasks">{totalTask}</span>, Completed:
                    <span id="completed-tasks">{completedCount}</span>
                </footer>
            </div>
           </div>
        </>
    )
}

export default Dashbord
