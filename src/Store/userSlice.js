import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    removeUser: (state) => {
      state.name = null;
      state.email = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
