import React, { useEffect, useState } from 'react'
import './Dashbord.css'
import Tasklist from '../Tasklist/Tasklist'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTodoData, UpdateTodoData, editModestatus, fetchTodoData } from '../../Redux/Slice';


function Dashbord() {
    const [priority, setPriority] = useState("all")
    const { todo, tastDetails, editMode } = useSelector((state) => state.todo)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();
if(editMode){
    setValue("title",tastDetails.title)
    setValue("priority",tastDetails.priority)
    setValue("dueDate",tastDetails.dueDate)
    setValue("description",tastDetails.description)
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
    }, [dispatch])

    const handleCancel = () => {
        dispatch(editModestatus(false))

    }

    return (
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
                            <button type='submit' id="add-task-button">update</button>
                            <button type='button' id="add-task-button" onClick={() => handleCancel()}>cancel</button>
                        </>

                        :
                        <button type='submit' id="add-task-button"> + </button>
                    }
                </div>
                <input type="date" className='date-picker' name='dueDate'   {...register("dueDate")}  />
                <textarea className='text-area' placeholder="Enter Descripion here" name='description'   {...register("description")}></textarea>
            </form>
            <div class="task-list" ></div>
            <Tasklist priority={priority} />
            <footer>
                Total tasks: <span id="total-tasks">{totalTask}</span>, Completed:
                <span id="completed-tasks"></span>
            </footer>
        </div>
    )
}

export default Dashbord