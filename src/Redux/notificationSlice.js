import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notifications:[],
}

export const fetchNotifications = createAsyncThunk("notification/fetchNotifications",async () => {
    const id= localStorage.getItem('userId')
    const response = await axios.get(`http://localhost:6060/notification?id=${id}`);
    return response.data;
  }
)


export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state,{payload}) => {
        state.notifications = payload;
      })
    }
})


export default notificationSlice.reducer