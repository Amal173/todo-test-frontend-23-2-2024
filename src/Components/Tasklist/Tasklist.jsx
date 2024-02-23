import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteTodoData, editTaskStatus, fetchTodoData } from '../../Redux/Slice';
import './Tasklist.css'
function Tasklist() {
    const dispatch = useDispatch()
    const { todo } = useSelector((state) => state.todo)


    console.log(todo);
    useEffect(() => {
        dispatch(fetchTodoData())
    }, [dispatch])

    const HandleDelete =async (id) => {
       await dispatch(DeleteTodoData(id))
        dispatch(fetchTodoData())
    }
    const HandleEdit = (id) => {
        dispatch(editTaskStatus(id))
    }

    return (
        <div className='todo-list'>
            {todo?.todo?.map((data) => (
                <div className="todo-item" key={data._id}>
                    <h1><strong>Title</strong> : {data.title}</h1>
                    <p><strong>Discription</strong> : {data.description}</p>
                    <p><strong>DueDate</strong> :{data.dueDate}</p>
                    <p><strong>Priority</strong> : {data.priority}</p>
                    <p><strong>Status</strong> : {data.status}</p>
                    <input type="checkbox" />
                    <button onClick={() => HandleDelete(data._id)}>Delete</button>
                    <button onClick={() => HandleEdit(data._id)}>edit</button>
                </div>
            ))}
        </div>
    )
}

export default Tasklist
