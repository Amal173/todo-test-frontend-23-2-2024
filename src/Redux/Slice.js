import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  todo:[]
}

export const fetchTodoData = createAsyncThunk("todo/fetchTodoData",async () => {
    const response = await axios.get(`http://localhost:6060/todo`);
    return response.data;
  }
)
export const editTaskStatus= createAsyncThunk("todo/editTaskStatus",async (id) => {
    const response = await axios.put(`http://localhost:6060/todo/status/${id}`);
    return response.data;
  } 
)

export const CreateTodoData = createAsyncThunk("todo/CreateTodoData",async (data) => {
  console.log(data);
    const response = await axios.post(`http://localhost:6060/todo`,data);
    return response.data;
  }
)
export const DeleteTodoData = createAsyncThunk("todo/DeleteTodoData",async (id) => {
  console.log(id);
    const response = await axios.delete(`http://localhost:6060/todo/${id}`);
    return response.data;
  }
)

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoData.fulfilled, (state,{payload}) => {
        state.todo = payload;
      })

    }
})


export const { } = todoSlice.actions

export default todoSlice.reducer