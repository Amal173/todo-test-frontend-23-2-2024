import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./Slice"
import userReducer from "./userSlice"
import notificationReducer from './notificationSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    notification: notificationReducer,
  },
})