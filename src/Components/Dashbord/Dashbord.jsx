import React, { useEffect } from 'react'
import './Dashbord.css'
import Tasklist from '../Tasklist/Tasklist'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTodoData, fetchTodoData } from '../../Redux/Slice';


function Dashbord() {
const dispatch=useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
    
      const onSubmit = async(data) => {
       await dispatch(CreateTodoData(data))
       dispatch(fetchTodoData())
       reset()
      };


      const {todo}=useSelector((state)=>state.todo)
      const totalTask=todo?.todo?.length
      console.log(todo);
      useEffect(()=>{
          dispatch(fetchTodoData())
      },[dispatch])

  return (
    <div class="to-do-list">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div class="add-task-container">
        <input type="text" placeholder="Add new task..." id="new-task" name='title'{...register("title")}/>
        <select id="task-filter" name='priority'{...register("priority")}>
          <option value="all">All</option>
          <option value="urgent">Urgent</option>
          <option value="important">Important</option>
          <option value="optional">Optional</option>
        </select>
        <button type='submit' id="add-task-button">+</button>
      </div>
        <input type="date" className='date-picker' name='dueDate' {...register("dueDate")}/>
        <textarea className='text-area' placeholder="Enter Descripion here" name='description' {...register("description")}></textarea>
        </form>
      <div class="task-list" ></div>
      <Tasklist/>
      <footer>
        Total tasks: <span id="total-tasks">{totalTask}</span>, Completed:
        <span id="completed-tasks"></span>
      </footer>
    </div>
  )
}

export default Dashbord