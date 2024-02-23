import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteTodoData, editModestatus, editTaskStatus, fetchTodoData, gettaskDetails } from '../../Redux/Slice';
import './Tasklist.css'
function Tasklist({ priority }) {
    const dispatch = useDispatch()
    const { todo } = useSelector((state) => state.todo)


    useEffect(() => {
        dispatch(fetchTodoData())
    }, [dispatch])

    const HandleDelete = async (id) => {
        await dispatch(DeleteTodoData(id))
        dispatch(fetchTodoData())
    }
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
        console.log(data);
    }

    return (
        <div className='todo-list'>
            {todo?.todo?.map((data) => (
                data.priority == priority || priority == "all" ?
                    <div className="todo-item" key={data._id}>
                        <h1><strong>Title</strong> : {data.title}</h1>
                        <p><strong>Discription</strong> : {data.description}</p>
                        <p><strong>DueDate</strong> :{data.dueDate}</p>
                        <p><strong>Priority</strong> : {data.priority}</p>
                        <p><strong>Status</strong> : {data.status}</p>
                        <input type="checkbox" onChange={() => HandleStatus(data._id, data.status)} checked={data.status === "completed"} />
                        <button onClick={() => HandleDelete(data._id)}>Delete</button>
                        <button onClick={() => HandleEdit(data)}>edit</button>
                    </div> : null
            ))}
        </div>
    )
}

export default Tasklist
