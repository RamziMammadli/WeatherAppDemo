import {createSlice} from '@reduxjs/toolkit';

interface AppState {
    backgroundColor: string;
  }
  
  const initialState: AppState = {
    backgroundColor: 'white', // Varsayılan arkaplan rengi
  };

const changeTheme = createSlice({
  name: 'mod',
  initialState,
  reducers: {
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const { setBackgroundColor } = changeTheme.actions;
export default changeTheme.reducer;
