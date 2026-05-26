import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },
    clearUserData: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
    },
  },
});

export const { setUserData, clearUserData } = usersSlice.actions;
export default usersSlice.reducer;