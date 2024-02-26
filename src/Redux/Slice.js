import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  todo: [],
  tastDetails: {},
  editMode: false,
  sharedData: {}
}

export const fetchTodoData = createAsyncThunk("todo/fetchTodoData", async () => {
  const id = localStorage.getItem('userId')
  const response = await axios.get(`http://localhost:6060/todo?id=${id}`);
  return response.data;
}
)

export const fetchSharedData = createAsyncThunk("todo/fetchSharedData", async () => {
  const id = localStorage.getItem('userId')
  const response = await axios.get(`http://localhost:6060/todo/shared/?id=${id}`);
  return response.data;
}
)

export const editTaskStatus = createAsyncThunk("todo/editTaskStatus", async ({ id, status }) => {
  console.log(id, status);
  const response = await axios.put(`http://localhost:6060/todo/status/${id}`, { status });
  return response.data;
}
)

export const taskShare = createAsyncThunk("todo/taskShare", async ({ shareTask, selectedUsers }) => {
  console.log(shareTask, selectedUsers);
  const response = await axios.post(`http://localhost:6060/todo/sharetask`, { shareTask, selectedUsers });
  return response.data;
}
)

export const CreateTodoData = createAsyncThunk("todo/CreateTodoData", async (data) => {
  console.log(data);
  const response = await axios.post(`http://localhost:6060/todo`, data);
  return response.data;
}
)


export const UpdateTodoData = createAsyncThunk("todo/UpdateTodoData", async ({ id, data }) => {
  console.log(data, id);
  const response = await axios.put(`http://localhost:6060/todo/${id}`, { data });
  return response.data
}
)

export const updateTaskOrder = createAsyncThunk("todo/updateTaskOrder", async (orderData) => {
  console.log(orderData);
  const response = await axios.post(`http://localhost:6060/todo/order`, orderData);
  return response.data
}
)

export const DeleteTodoData = createAsyncThunk("todo/DeleteTodoData", async (id) => {
  console.log(id);
  const response = await axios.delete(`http://localhost:6060/todo/${id}`);
  return response.data;
}
)


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    gettaskDetails: (state, { payload }) => {
      state.tastDetails = ""
      state.tastDetails = payload
    },
    editModestatus: (state, { payload }) => {
      state.editMode = payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoData.fulfilled, (state, { payload }) => {
        state.todo = payload;
      })
    builder.addCase(fetchSharedData.fulfilled, (state, { payload }) => {
      state.sharedData = payload;
    })

  }
})


export const { gettaskDetails, editModestatus } = todoSlice.actions

export default todoSlice.reducer