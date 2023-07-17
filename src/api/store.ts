import { configureStore } from '@reduxjs/toolkit'
import changeTheme from './reducers/changeTheme'

export const store = configureStore({
  reducer: {
    mod: changeTheme
  },
})