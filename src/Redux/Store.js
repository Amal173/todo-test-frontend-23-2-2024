//store.jsx
import { configureStore } from '@reduxjs/toolkit'
//Importing the reducer from countSlice
import todoReducer from "./Slice"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
})